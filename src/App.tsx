import React, { useRef, useEffect } from "react";
import {
  Pagination,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import SearchField from "./components/material/SearchField";
import Dropdown from "./components/material/Dropdown";
import AgentCard from "./components/material/AgentCardVertical";
import Button from "./components/material/Button";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

import { AgentKey } from "./data/AgentSchema";
import { SortOptions } from "./data/SortOptions";

import { AppViewModel } from "./AppViewModel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  const {
    agentTypes,
    currentAgents,
    currentPage,
    totalPages,
    sortOrder,
    selectedAgents,
    openChangeAgentsPriorityDialog,
    openChangeAgentDialog,
    openAddAgentDialog,
    newPriority,
    sortOptions,
    filterOptions,
    deselectAgents,
    handleSearch,
    handleTypeSelect,
    handlePageChange,
    handleSortSelect,
    handleSortOrderChange,
    handleCardClick,
    handlePriorityChange,
    setChangeAgentsPriorityDialogOpen,
    setAddAgentDialogOpen,
    setChangeAgentDialogOpen,
    setPriority,
  } = AppViewModel();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      buttonsRef.current &&
      !buttonsRef.current.contains(event.target as Node) &&
      !openAddAgentDialog &&
      !openChangeAgentDialog &&
      !openChangeAgentsPriorityDialog
    ) {
      deselectAgents();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const handleOnChangeAgentClick = () => {
    console.log("Clicked.");
  };

  const handleOnChangeAgentsPriorityClick = () => {
    setChangeAgentsPriorityDialogOpen(true);
  };

  const handleOnAddAgentClick = () => {
    console.log("Clicked.");
  };

  const handleConfirmAgentsPriorityChange = () => {
    setChangeAgentsPriorityDialogOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100vh",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            p={2}
            sx={{ flexGrow: 1 }}
          >
            <Box display="flex" flexDirection="column" gap={3}>
              <SearchField placeholder="Поиск" onSearch={handleSearch} />
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" flexDirection="row" gap={3}>
                  <Dropdown
                    options={filterOptions}
                    onSelect={handleTypeSelect}
                    placeholder="Тип"
                    defaultValue="Все"
                    sx={{ width: 100 }}
                  />
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Dropdown
                      options={sortOptions}
                      onSelect={handleSortSelect}
                      placeholder="Порядок"
                      defaultValue={AgentKey.name}
                      sx={{ width: 200 }}
                    />
                    <IconButton
                      onClick={handleSortOrderChange}
                      size="small"
                      sx={{ height: "fit-content" }}
                    >
                      {sortOrder === SortOptions.ASC ? (
                        <ArrowUpward />
                      ) : (
                        <ArrowDownward />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  ref={buttonsRef}
                  display="flex"
                  flexDirection="row"
                  gap={2}
                >
                  {selectedAgents.length > 1 && (
                    <Button
                      label="Изменить приоритет"
                      onClick={handleOnChangeAgentsPriorityClick}
                      size="large"
                    ></Button>
                  )}
                  {selectedAgents.length === 1 && (
                    <Button
                      label="Изменить"
                      onClick={handleOnChangeAgentClick}
                      size="large"
                    ></Button>
                  )}
                  {selectedAgents.length === 0 && (
                    <Button
                      label="Добавить"
                      onClick={handleOnAddAgentClick}
                      size="large"
                      color="success"
                    ></Button>
                  )}
                </Box>
              </Box>
            </Box>

            <Grid2
              ref={containerRef}
              container
              spacing={2}
              sx={{ flexGrow: 1 }}
            >
              {currentAgents.map((agent, index) => (
                <Grid2 key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                  <AgentCard
                    image={agent.image}
                    type={
                      agentTypes.get(agent.agentType)?.title ||
                      "Неизвестный тип"
                    }
                    name={agent.name}
                    sales={agent.salesCount}
                    phone={agent.phone}
                    priority={agent.priority}
                    discount={agent.discount}
                    isSelected={selectedAgents.includes(agent.id)}
                    onClick={() => handleCardClick(agent.id)}
                  />
                </Grid2>
              ))}
            </Grid2>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>

        <Dialog
          open={openChangeAgentsPriorityDialog}
          onClose={() => setChangeAgentsPriorityDialogOpen(false)}
        >
          <DialogTitle>Изменить приоритет агентов</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Приоритет"
              value={newPriority}
              onChange={handlePriorityChange}
              type="number"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                marginTop: 1,
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                  color: "#fff",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
                  {
                    filter: "invert(1)", // Инвертирование цвета стрелок
                  },
              }}
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button
              label="Подтвердить"
              onClick={handleConfirmAgentsPriorityChange}
              color="primary"
            ></Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default App;
