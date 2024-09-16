import React, { useState, useRef, useEffect } from "react";
import { Pagination, Grid2 } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import SearchField from "./components/material/SearchField";
import Dropdown from "./components/material/Dropdown";
import AgentCard from "./components/material/AgentCardVertical";
import Button from "./components/material/Button";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ArrowDownward, ArrowUpward, More } from "@mui/icons-material";

import { AgentKey } from "./data/AgentSchema";
import { SortOptions } from "./data/SortOptions";

import AgentLocalSource from "./data/AgentLocalSource";
import { AgentRepository } from "./data/AgentRepository";
import AgentTypeLocalSource from "./data/AgentTypeLocalSource";
import { AgentTypeRepository } from "./data/AgentTypeRepository";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("Все");
  const [sortCriteria, setSortCriteria] = useState<string>(AgentKey.name);
  const [sortOrder, setSortOrder] = useState<SortOptions>(SortOptions.ASC);
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);

  const agentLocalSource = new AgentLocalSource();
  const agentRepository = new AgentRepository(agentLocalSource);
  const agents = agentRepository.getAgents();

  const agentTypeLocalSource = new AgentTypeLocalSource();
  const agentTypeRepository = new AgentTypeRepository(agentTypeLocalSource);
  const agentTypes = agentTypeRepository.getAgentTypesMap();
  const titlesOfAgentTypes = agentTypeRepository.getTitles();

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.phone.includes(searchQuery) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "Все" ||
      agent.agentType === agentTypeRepository.getId(selectedType);

    return matchesSearch && matchesType;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortCriteria === AgentKey.name) {
      return sortOrder === SortOptions.ASC
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortCriteria === AgentKey.discount) {
      return sortOrder === SortOptions.ASC
        ? a.discount - b.discount
        : b.discount - a.discount;
    } else if (sortCriteria === AgentKey.priority) {
      return sortOrder === SortOptions.ASC
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
    { value: AgentKey.name, label: "Наименование" },
    { value: AgentKey.discount, label: "Скидка" },
    { value: AgentKey.priority, label: "Приоритет" },
  ];

  const filterOptions = ["Все", ...titlesOfAgentTypes].map((type) => ({
    value: type,
    label: type,
  }));

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTypeSelect = (type: string): void => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      buttonsRef.current &&
      !buttonsRef.current.contains(event.target as Node)
    ) {
      setSelectedAgents([]);
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
  const handleCardClick = (agentId: number) => {
    setSelectedAgents((prevSelected) =>
      prevSelected.includes(agentId)
        ? prevSelected.filter((id) => id !== agentId)
        : [...prevSelected, agentId]
    );
  };

  const handleOnChangeAgentClick = () => {
    console.log("Clicked.");
  };

  const handleOnChangeAgentsPriorityClick = () => {
    console.log("Clicked.");
  };

  const handleOnAddAgentClick = () => {
    console.log("Clicked.");
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
                <Box ref={buttonsRef} display="flex" flexDirection="row" gap={2}>
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

            <Grid2 ref={containerRef} container spacing={2} sx={{ flexGrow: 1 }}>
              {currentItems.map((agent, index) => (
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
      </Container>
    </ThemeProvider>
  );
};

export default App;
