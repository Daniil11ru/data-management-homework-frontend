import React, { useState } from "react";
import { Pagination, Grid2 } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import SearchField from "./components/material/SearchField";
import Dropdown from "./components/material/Dropdown";
import AgentCard from "./components/material/AgentCardVertical";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

import agents from "./data/agents.json";
import types from "./data/types.json";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  const handleClick = (): void => {
    console.log("Button was clicked.");
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1); // Сброс страницы на первую при изменении запроса
  };

  const handleTypeSelect = (type: string): void => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleSortSelect = (criteria: string) => {
    setSortCriteria(criteria);
    setCurrentPage(1); // Сброс страницы на первую при изменении критерия сортировки
  };

  // Обработчик изменения порядка сортировки
  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("Все");
  const [sortCriteria, setSortCriteria] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.phone.includes(searchQuery) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "Все" || agent.type === selectedType;

    return matchesSearch && matchesType;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortCriteria === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortCriteria === "discount") {
      return sortOrder === "asc"
        ? a.discount - b.discount
        : b.discount - a.discount;
    } else if (sortCriteria === "priority") {
      return sortOrder === "asc"
        ? a.priority - b.priority
        : b.priority - a.priority;
    }
    return 0;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage);

  const currentItems = sortedAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortOptions = [
    { value: "name", label: "Наименование" },
    { value: "discount", label: "Скидка" },
    { value: "priority", label: "Приоритет" },
  ];

  const filterOptions = ["Все", ...types].map((type) => ({
    value: type,
    label: type,
  }));

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
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
              <Box flexGrow={1}>
                <SearchField placeholder="Поиск" onSearch={handleSearch} />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Dropdown
                  options={sortOptions}
                  onSelect={handleSortSelect}
                  placeholder="Порядок"
                  defaultValue="name"
                />
                <IconButton
                  onClick={handleSortOrderChange}
                  size="small"
                  sx={{ height: "fit-content" }}
                >
                  {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
              </Box>
              <Box>
                <Dropdown
                  options={filterOptions}
                  onSelect={handleTypeSelect}
                  placeholder="Тип"
                  defaultValue="Все"
                />
              </Box>
            </Box>

            <Grid2 container spacing={2} sx={{ flexGrow: 1 }}>
              {currentItems.map((agent, index) => (
                <Grid2 key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                  <AgentCard {...agent} />
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
      </Container>
    </ThemeProvider>
  );
};

export default App;
