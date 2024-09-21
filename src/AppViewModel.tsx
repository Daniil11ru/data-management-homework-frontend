import { useState, useEffect } from "react";
import { Agent, AgentKey } from "./data/AgentSchema";
import { AgentType } from "./data/AgentTypeSchema";
import { SortOptions } from "./data/SortOptions";
import { AgentRepository } from "./data/AgentRepository";
import AgentRemoteSource  from "./data/AgentRemoteSource";
import AgentTypeRemoteSource from "./data/AgentTypeRemoteSource"
import { AgentTypeRepository } from "./data/AgentTypeRepository";

export const AppViewModel = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentTypes, setAgentTypes] = useState<AgentType[]>([]);
  const [agentTypesMap, setAgentTypesMap] = useState<Map<number, AgentType>>(
    new Map<number, AgentType>()
  );
  const [agentTypeTitles, setAgentTypeTitles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("Все");
  const [sortCriteria, setSortCriteria] = useState<string>(AgentKey.title);
  const [sortOrder, setSortOrder] = useState<SortOptions>(SortOptions.ASC);
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [openChangeAgentsPriorityDialog, setChangeAgentsPriorityDialogOpen] =
    useState<boolean>(false);
  const [openChangeAgentDialog, setChangeAgentDialogOpen] =
    useState<boolean>(false);
  const [openAddAgentDialog, setAddAgentDialogOpen] = useState(false);
  const [newPriority, setPriority] = useState<number>(0);

  const agentRemoteSource = new AgentRemoteSource();
  const agentRepository = new AgentRepository(agentRemoteSource);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await agentRepository.getAgents();
        setAgents(data);
      } catch (error) {
        console.error("Ошибка при получении агентов:", error);
      }
    };

    fetchAgents();
  }, []);

  const agentTypeRemoteSource = new AgentTypeRemoteSource();
  const agentTypeRepository = new AgentTypeRepository(agentTypeRemoteSource);
  useEffect(() => {
    const fetchAgentTypes = async () => {
      try {
        const data = await agentTypeRepository.getAgentTypes();
        setAgentTypes(data);
      } catch (error) {
        console.error("Ошибка при получении типов агентов:", error);
      }
    };

    fetchAgentTypes();
  }, []);
  useEffect(() => {
    const fetchAgentTypesMap = async () => {
      try {
        const data = await agentTypeRepository.getAgentTypesMap();
        setAgentTypesMap(data);
      } catch (error) {
        console.error("Ошибка при получении типов агентов:", error);
      }
    };

    fetchAgentTypesMap();
  }, []);
  useEffect(() => {
    const fetchAgentTypeTitles = async () => {
      try {
        const data = await agentTypeRepository.getTitles();
        setAgentTypeTitles(data);
      } catch (error) {
        console.error("Ошибка при получении названий типов агентов:", error);
      }
    };

    fetchAgentTypeTitles();
  }, []);

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.phone.includes(searchQuery) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "Все" ||
      agent.agentTypeId ===
        agentTypes.find((agentTypeId) => agentTypeId.title === selectedType)?.id;

    return matchesSearch && matchesType;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortCriteria === AgentKey.title) {
      return sortOrder === SortOptions.ASC
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
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
    { value: AgentKey.title, label: "Наименование" },
    { value: AgentKey.discount, label: "Скидка" },
    { value: AgentKey.priority, label: "Приоритет" },
  ];

  const filterOptions = ["Все", ...agentTypeTitles].map((type) => ({
    value: type,
    label: type,
  }));

  const getMaxPriorityOfSelectedAgents = (): number => {
    if (selectedAgents.length === 0) return 0;

    const selectedAgentObjects = agents.filter((agent) =>
      selectedAgents.includes(agent.id)
    );

    return Math.max(...selectedAgentObjects.map((agent) => agent.priority));
  };

  const updatePriorityOfSelectedAgents = async () => {
    const newAgents = agents.map((agent) => {
      if (selectedAgents.includes(agent.id)) {
        const newAgent = agent;
        newAgent.priority = newPriority;
        return newAgent;
      } 
      else {
        return agent;
      }
    });
    setAgents(newAgents);

    for (let agentId of selectedAgents) {
      agentRepository.updateAgent(agents[agentId]);
    }
  };

  return {
    agentTypesMap,
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
    getMaxPriorityOfSelectedAgents,
    updatePriorityOfSelectedAgents,
    setChangeAgentsPriorityDialogOpen,
    setAddAgentDialogOpen,
    setChangeAgentDialogOpen,
    setPriority,
    setSelectedAgents,
    setSortCriteria,
    setSortOrder,
    setCurrentPage,
    setSelectedType,
    setSearchQuery,
  };
};
