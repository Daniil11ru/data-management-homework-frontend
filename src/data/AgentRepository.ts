import { AgentSource } from "./AgentSource";

import { Agent } from "./AgentSchema";

export class AgentRepository {
  private agentSource: AgentSource;

  constructor(agentSource: AgentSource) {
    this.agentSource = agentSource;
  }

  private parse(agents: any[]): Agent[] {
    return agents.map((agent) => ({
      id: agent.ID,
      title: agent.Title,
      address: agent.Address,
      INN: agent.INN,
      KPP: agent.KPP,
      directorName: agent.DirectorName,
      agentTypeId: agent.AgentTypeID,
      agentType: agent.AgentType,
      salesCount: agent.SalesCount,
      phone: agent.Phone,
      priority: agent.Priority,
      discount: agent.Discount,
      email: agent.Email,
      logo: agent.Logo,
      totalSales: agent.TotalSales,
    }));
  }

  async getAgents(): Promise<Agent[]> {
    return this.parse(await this.agentSource.getAgents());
  }

  async updateAgent(updatedAgent: Agent) {
    this.agentSource.updateAgent(updatedAgent);
  }
}
