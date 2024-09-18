import { useState, useRef, useEffect } from "react";
import { AgentKey } from "./data/AgentSchema";
import { SortOptions } from "./data/SortOptions";
import AgentLocalSource from "./data/AgentLocalSource";
import { AgentRepository } from "./data/AgentRepository";
import AgentTypeLocalSource from "./data/AgentTypeLocalSource";
import { AgentTypeRepository } from "./data/AgentTypeRepository";

export const AppViewModel = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("Все");
  const [sortCriteria, setSortCriteria] = useState<string>(AgentKey.name);
  const [sortOrder, setSortOrder] = useState<SortOptions>(SortOptions.ASC);
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [openChangeAgentsPriorityDialog, setChangeAgentsPriorityDialogOpen] =
    useState<boolean>(false);
  const [openChangeAgentDialog, setChangeAgentDialogOpen] =
    useState<boolean>(false);
  const [openAddAgentDialog, setAddAgentDialogOpen] = useState(false);
  const [newPriority, setPriority] = useState<number>(0);

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

  const currentAgents = sortedAgents.slice(
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

  const handleCardClick = (agentId: number) => {
    setSelectedAgents((prevSelected) =>
      prevSelected.includes(agentId)
        ? prevSelected.filter((id) => id !== agentId)
        : [...prevSelected, agentId]
    );
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(parseInt(event.target.value));
  };
  
  return {
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
  };
};
