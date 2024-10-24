import React, { useEffect, useState } from "react";
import {
  Pagination,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  darken,
  lighten,
} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";

import SearchField from "../units/SearchField";
import NumberField from "../units/NumberField";
import Dropdown from "../units/Dropdown";
import AgentCard from "../units/AgentCardVertical";
import Button from "../units/Button";

import {
  AddOutlined,
  ArrowDownward,
  ArrowUpward,
  Edit,
  EditOutlined,
  PriorityHighOutlined,
} from "@mui/icons-material";

import { AgentKey } from "../../data/AgentSchema";
import { SortOptions } from "../../data/SortOptions";

import { AppViewModel } from "./MainViewModel";
import BreadcrumbNav from "../units/BreadcrumbNav";
import ThemeToggleButton from "../units/ThemeToggleButton";
import { rgbToHex } from "../../data/Utils";

const App: React.FC = () => {
  const {
    agentTypeIdToTitle,
    currentAgents,
    currentPage,
    totalPages,
    sortOrder,
    selectedAgents,
    openChangeAgentsPriorityDialog,
    newPriority,
    sortOptions,
    filterOptions,
    getMaxPriorityOfSelectedAgents,
    updatePriorityOfSelectedAgents,
    setChangeAgentsPriorityDialogOpen,
    setPriority,
    setSelectedAgents,
    setSortCriteria,
    setSortOrder,
    setCurrentPage,
    setSelectedType,
    setSearchQuery,
  } = AppViewModel();

  const navigate = useNavigate();

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTypeSelect = (type: string): void => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSortSelect = (criteria: string) => {
    setSortCriteria(criteria);
    setCurrentPage(1);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) =>
      prevOrder === SortOptions.ASC ? SortOptions.DESC : SortOptions.ASC
    );
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(parseInt(event.target.value));
  };

  const handleOnChangeAgentClick = () => {
    navigate(`/edit-agent/${selectedAgents[0]}`);
  };

  const handleOnChangeAgentsPriorityClick = () => {
    setPriority(getMaxPriorityOfSelectedAgents());
    setChangeAgentsPriorityDialogOpen(true);
  };

  const handleOnAddAgentClick = () => {
    navigate(`/add-agent/`);
  };

  const handleConfirmAgentsPriorityChange = () => {
    setChangeAgentsPriorityDialogOpen(false);
    updatePriorityOfSelectedAgents();
  };

  const handleCardClick = (agentId: number) => {
    setSelectedAgents((prevSelected) =>
      prevSelected.includes(agentId)
        ? prevSelected.filter((id) => id !== agentId)
        : [...prevSelected, agentId]
    );
  };

  const theme = useTheme();
  const [placeholderImageLink, setPlaceholderImageLink] = useState("");

  useEffect(() => {
    const newPlaceholderLink =
      theme.palette.mode === "light"
        ? `https://placehold.co/200x200/${rgbToHex(
            darken(theme.palette.background.paper, 0.2)
          )}/404040`
        : `https://placehold.co/200x200/${rgbToHex(
            lighten(theme.palette.background.paper, 0.2)
          )}/C0C0C0`;
    setPlaceholderImageLink(newPlaceholderLink);
  }, [theme]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          position: "absolute",
          top: 5,
          left: 5,
        }}
      >
        <ThemeToggleButton />
      </Box>

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
                    defaultValue={AgentKey.title}
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
              <Box display="flex" flexDirection="row" gap={2}>
                {selectedAgents.length > 1 && (
                  <Button
                    label="Изменить приоритет"
                    onClick={handleOnChangeAgentsPriorityClick}
                    size="large"
                    // variant="text"
                    endIcon={<EditOutlined />}
                  ></Button>
                )}
                {selectedAgents.length === 1 && (
                  <Button
                    label="Изменить"
                    onClick={handleOnChangeAgentClick}
                    size="large"
                    // variant="text"
                    endIcon={<EditOutlined />}
                  ></Button>
                )}
                {selectedAgents.length === 0 && (
                  <Button
                    label="Добавить"
                    onClick={handleOnAddAgentClick}
                    size="large"
                    color="success"
                    // variant="text"
                    endIcon={<AddOutlined />}
                  ></Button>
                )}
              </Box>
            </Box>
          </Box>

          <Grid2 container spacing={2} sx={{ flexGrow: 1 }}>
            {currentAgents.map((agent, index) => (
              <Grid2 key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                <AgentCard
                  image={agent.logo || placeholderImageLink}
                  placeholderImage={placeholderImageLink}
                  type={
                    agentTypeIdToTitle.get(agent.agentTypeId) ||
                    "Неизвестный тип"
                  }
                  name={agent.title}
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
        onClose={() => {
          setChangeAgentsPriorityDialogOpen(false);
        }}
      >
        <DialogTitle>Изменить приоритет агентов</DialogTitle>
        <DialogContent>
          <NumberField
            value={newPriority}
            onChange={handlePriorityChange}
            fullWidth
            label="Приоритет"
            sx={{ marginTop: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            label="Подтвердить"
            onClick={handleConfirmAgentsPriorityChange}
            color="primary"
            variant="text"
          ></Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
