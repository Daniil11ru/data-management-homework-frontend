import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material";

import { AddAgentViewModel } from "./AddAgentViewModel";
import AgentForm from "../forms/AgentForm";
import { Agent } from "../../data/AgentSchema";
import { SaleOperation, SaleOperationType } from "../../data/Utils";
import BreadcrumbNav from "../units/BreadcrumbNav";
import { AddOutlined } from "@mui/icons-material";

const EditAgent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setError, addAgent, agentTypeDropdownOptions, addSale, products } =
    AddAgentViewModel(Number(id));

  const navigate = useNavigate();

  const handleFormSubmit = async (
    agent: Agent,
    salesOperations: SaleOperation[]
  ) => {
    try {
      console.log(agent);
      await addAgent(agent);
      for (const operation of salesOperations) {
        if (operation.type === SaleOperationType.ADD) {
          addSale(agent.id, operation.sale, operation.productId);
        }
      }
      navigate("/");
    } catch (err) {
      console.error("Ошибка при добавлении агента:", err);
      setError("Не удалось добавить агента");
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "input[type='date']::-webkit-calendar-picker-indicator": {
            filter: "invert(1)",
          },
          "*::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "#2e2e2e",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#6b6b6b",
            borderRadius: "8px",
          },
        },
      },
    },
  });

  const breadcrumbs = [
    { label: "Агенты", path: "/" },
    { label: "Новый агент" },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box marginY={2} marginBottom={4}>
          <BreadcrumbNav paths={breadcrumbs} />
        </Box>

        <AgentForm
          formPurpose="add"
          agentTypeDropdownOptions={agentTypeDropdownOptions}
          products={products}
          submitButtonTitle="Добавить"
          submitButtonIcon={<AddOutlined />}
          handleFormSubmit={handleFormSubmit}
        />
      </Container>
    </ThemeProvider>
  );
};

export default EditAgent;
