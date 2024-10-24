import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material";

import { EditAgentViewModel } from "./EditAgentViewModel";
import AgentForm from "../forms/AgentForm";
import { Agent } from "../../data/AgentSchema";
import { Sale } from "../../data/SaleSchema";
import { SaleOperation, SaleOperationType } from "../../data/Utils";
import BreadcrumbNav from "../units/BreadcrumbNav";
import ThemeToggleButton from "../units/ThemeToggleButton";

const EditAgent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    setError,
    agent,
    setAgent,
    updateAgent,
    deleteAgent,
    agentTypes,
    agentTypeDropdownOptions,
    agentSales,
    addSale,
    deleteSale,
    products,
  } = EditAgentViewModel(Number(id));

  const navigate = useNavigate();

  const handleAgentDelete = async () => {
    try {
      await deleteAgent(Number(id));
      navigate("/");
    } catch (err) {
      console.error("Ошибка при удалении агента:", err);
      setError("Не удалось удалить агента");
    }
  };

  const handleFormSubmit = async (
    updatedAgent: Agent,
    salesOperations: SaleOperation[]
  ) => {
    setAgent(updatedAgent);

    try {
      for (const operation of salesOperations) {
        if (operation.type === SaleOperationType.DELETE) {
          deleteSale(operation.sale.id);
        } else {
          addSale(updatedAgent.id, operation.sale);
        }
      }

      await updateAgent(updatedAgent);
      navigate("/");
    } catch (err) {
      console.error("Ошибка при обновлении агента:", err);
      setError("Не удалось обновить агента");
    }
  };

  const breadcrumbs = [
    { label: "Агенты", path: "/" },
    { label: agent?.title || "Редактирование агента" },
  ];

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
        formPurpose="edit"
        agentTypeDropdownOptions={agentTypeDropdownOptions}
        products={products}
        submitButtonTitle="Сохранить"
        handleFormSubmit={handleFormSubmit}
        onDeleteClick={handleAgentDelete}
        agentInfo={
          agent != undefined && agentSales != undefined
            ? { agent: agent, agentSales: agentSales }
            : undefined
        }
      />
    </Container>
  );
};

export default EditAgent;
