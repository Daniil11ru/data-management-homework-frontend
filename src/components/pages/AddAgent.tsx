import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";

import { AddAgentViewModel } from "./AddAgentViewModel";
import AgentForm from "../forms/AgentForm";
import { Agent } from "../../data/AgentSchema";
import { SaleOperation, SaleOperationType } from "../../data/Utils";
import BreadcrumbNav from "../units/BreadcrumbNav";
import { AddOutlined } from "@mui/icons-material";
import { Breadcrumb } from "./utils/Breadcrumb";
import { Box, Container } from "@mui/material";
import ThemeToggleButton from "../units/ThemeToggleButton";

const AddAgent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setError, addAgent, agentTypeDropdownOptions, addSale, products } =
    AddAgentViewModel(Number(id));
  const [agentTitle, setAgentTitle] = React.useState<string>("Новый агент");
  const [breadcrumbs, setBreadcrumbs] = React.useState<Breadcrumb[]>([
    { label: "Агенты", path: "/" },
    { label: agentTitle },
  ]);

  const navigate = useNavigate();

  const handleAgentChange = (agent: Agent) => {
    if (agentTitle !== agent.title) {
      setAgentTitle(agent.title);
    }
  };

  const handleFormSubmit = async (
    agent: Agent,
    salesOperations: SaleOperation[]
  ) => {
    try {
      const agentId = await addAgent(agent);

      if (agentId) {
        agent.id = agentId;

        for (const operation of salesOperations) {
          if (operation.type === SaleOperationType.ADD) {
            console.log("Продажа:", operation.sale);
            addSale(agent.id, operation.sale);
          }
        }
      } else {
        console.log("Не удалось добавить продажи новосозданного агента");
      }

      navigate("/");
    } catch (err) {
      console.error("Ошибка при добавлении агента:", err);
      setError("Не удалось добавить агента");
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          position: "absolute",
          top: 5,
          left: 5,
        }}
      >
        <ThemeToggleButton />
      </Box>

      <Box marginY={2} marginBottom={4}>
        <BreadcrumbNav paths={breadcrumbs} />
      </Box>

      <AgentForm
        formPurpose="add"
        agentTypeDropdownOptions={agentTypeDropdownOptions}
        products={products}
        submitButtonTitle="Добавить"
        submitButtonIcon={<AddOutlined />}
        handleAgentChange={handleAgentChange}
        handleFormSubmit={handleFormSubmit}
      />
    </Container>
  );
};

export default AddAgent;
