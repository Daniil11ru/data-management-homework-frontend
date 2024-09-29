// @ts-nocheck

import { Agent } from "./AgentSchema";
import { AgentSource } from "./AgentSource";
import { capitalizeKeys } from "./Utils";

// @deprecated
class AgentLocalSource extends AgentSource {
  private parse(agent: any): Agent {
    return {
      id: agent.Id,
      title: agent.Name,
      address: agent.Address,
      INN: agent.INN,
      KPP: agent.KPP,
      directorName: agent.DirectorName,
      agentTypeId: agent.AgentTypeID,
      agentTypeTitle: agent.AgentTypeTitle,
      salesCount: agent.SalesCount,
      phone: agent.Phone,
      priority: agent.Priority,
      discount: agent.Discount,
      email: agent.Email,
      logo: agent.Image,
      totalSales: agent.TotalSales,
    };
  }

  async getAgent(id: number): Promise<Agent> {
    const response = await fetch(`http://localhost:5000/agent/${id}`);
    const agent = await response.json();

    return this.parse(agent);
  }

  async getAgents(): Promise<Agent[]> {
    const response = await fetch("http://localhost:5000/agents");
    const agents = await response.json();

    return agents.map((agent: any) => this.parse(agent));
  }

  async updateAgent(agent: Agent) {
    try {
      const response = await fetch(`http://localhost:5000/agents/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(capitalizeKeys(agent)),
      });

      if (!response.ok) {
        throw new Error(`Ошибка обновления агента: ${response.status}`);
      }

      const result = await response.json();
      console.log("Агент обновлен:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
}

export default AgentLocalSource;
