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

export const AddAgentViewModel = (id: number) => {
  const [agentTypes, setAgentTypes] = useState<AgentType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const agentRemoteSource = new AgentRemoteSource();
  const agentRepository = new AgentRepository(agentRemoteSource);

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

  const addAgent = async (agent: Agent) : Promise<number | null> => {
    try {
      return await agentRepository.addAgent(agent);
    } catch (err) {
      setError("Ошибка при добавлении агента");
      console.error("Ошибка при добавлении агента:", err);
      return null;
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

  return {
    setError,
    addAgent,
    agentTypeDropdownOptions,
    addSale,
    products,
  }
};
