import { useState, useEffect } from "react";
import { Agent, AgentKey } from "./data/AgentSchema";
import { AgentType } from "./data/AgentTypeSchema";
import { SortOptions } from "./data/SortOptions";
import AgentLocalSource from "./data/AgentLocalSource";
import { AgentRepository } from "./data/AgentRepository";
import AgentTypeLocalSource from "./data/AgentTypeLocalSource";
import { AgentTypeRepository } from "./data/AgentTypeRepository";

export const AppViewModel = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentTypes, setAgentTypes] = useState<AgentType[]>([]);
  const [agentTypesMap, setAgentTypesMap] = useState<Map<number, AgentType>>(
    new Map<number, AgentType>()
  );
  const [agentTypeTitles, setAgentTypeTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await agentRepository.getAgents();
        setAgents(data);
      } catch (error) {
        console.error("Ошибка при получении агентов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const agentTypeLocalSource = new AgentTypeLocalSource();
  const agentTypeRepository = new AgentTypeRepository(agentTypeLocalSource);
  useEffect(() => {
    const fetchAgentTypes = async () => {
      try {
        const data = await agentTypeRepository.getAgentTypes();
        setAgentTypes(data);
      } catch (error) {
        console.error("Ошибка при получении типов агентов:", error);
      } finally {
        setLoading(false);
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
      } finally {
        setLoading(false);
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
      } finally {
        setLoading(false);
      }
    };

    fetchAgentTypeTitles();
  }, []);

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.phone.includes(searchQuery) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "Все" ||
      agent.agentType ===
        agentTypes.find((agentType) => agentType.title === selectedType)?.id;

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
    for (let agentId of selectedAgents) {
      agents[agentId].priority = newPriority;
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
