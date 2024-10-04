import { useState, useEffect } from "react";

import { Agent } from "../../data/AgentSchema";
import { AgentType } from "../../data/AgentTypeSchema";
import { Sale } from "../../data/SaleSchema";
import { Product } from "../../data/ProductSchema";
import { AgentRepository } from "../../data/AgentRepository";
import AgentRemoteSource from "../../data/AgentRemoteSource";
import AgentTypeRemoteSource from "../../data/AgentTypeRemoteSource";
import { AgentTypeRepository } from "../../data/AgentTypeRepository";
import ProductRemoteSource from "../../data/ProductRemoteSource";
import { ProductRepository } from "../../data/ProductRepository";

export const EditAgentViewModel = (id: number) => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentTypes, setAgentTypes] = useState<AgentType[]>([]);
  const [agentSales, setAgentSales] = useState<Sale[] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const agentRemoteSource = new AgentRemoteSource();
  const agentRepository = new AgentRepository(agentRemoteSource);
  useEffect(() => {
    const loadAgent = async () => {
      try {
        const agent = await agentRepository.getAgent(Number(id));
        if (agent) {
          setAgent(agent);
          
          setAgentSales(await agentRepository.getSales(agent.id));
        } else {
          setError("Агент не найден");
          console.error("Агент не найден");
        }
      } catch (err) {
        setError("Ошибка при загрузке данных агента");
        console.error("Ошибка при загрузке агента:", err);
      }
    };

    loadAgent();
  }, [id]);

  const agentTypeRemoteSource = new AgentTypeRemoteSource();
  const agentTypeRepository = new AgentTypeRepository(agentTypeRemoteSource);
  useEffect(() => {
    const fetchAgentTypes = async () => {
      try {
        const data = await agentTypeRepository.getAgentTypes();
        setAgentTypes(data);
      } catch (err) {
        setError("Ошибка при получении типов агентов");
        console.error("Ошибка при получении типов агентов:", err);
      }
    };

    fetchAgentTypes();
  }, []);
  const agentTypeDropdownOptions = agentTypes.map((agentType) => ({
    value: String(agentType.id),
    label: agentType.title,
  }));

  const productRemoteSource = new ProductRemoteSource();
  const productRepository = new ProductRepository(productRemoteSource);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(await productRepository.getProducts());
      } catch (err) {
        setError("Ошибка при получении продуктов");
        console.error("Ошибка при получении продуктов:", err);
      }
    };

    fetchProducts();
  }, []);

  const updateAgent = async (updatedAgent: Agent) => {
    try {
      await agentRepository.updateAgent(updatedAgent);
    } catch (err) {
      setError("Ошибка при обновлении агента");
      console.error("Ошибка при обновлении агента:", err);
    }
  };

  const deleteAgent = async (id: number) => {
    try {
      await agentRepository.deleteAgent(id);
    } catch (err) {
      setError("Ошибка при удалении агента");
      console.error("Ошибка при удалении агента:", err);
    }
  };

  const addSale = async (agentId: number, sale: Sale) => {
    try {
      await agentRepository.addSale(agentId, sale);
    } catch (err) {
      setError("Ошибка при добавлении продажи");
      console.error("Ошибка при добавлении продажи:", err);
    }
  };

  const deleteSale = async (saleId: number) => {
    try {
      await agentRepository.deleteSale(saleId);
    } catch (err) {
      setError("Ошибка при удалении продажи");
      console.error("Ошибка при удалении продажи:", err);
    }
  };

  return {
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
    products
  }
};
