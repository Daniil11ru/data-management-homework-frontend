import { AgentSource } from "./AgentSource";

import { Agent } from "./AgentSchema";

export class AgentRepository {
  private agentSource: AgentSource;

  constructor(agentSource: AgentSource) {
    this.agentSource = agentSource;
  }

  private parse(agents: any[]): Agent[] {
    return agents.map((agent) => ({
      id: agent.Id,
      image: agent.Image,
      agentType: agent.AgentType,
      name: agent.Name,
      salesCount: agent.SalesCount,
      phone: agent.Phone,
      priority: agent.Priority,
      discount: agent.Discount,
      email: agent.Email,
    }));
  }

  async getAgents(): Promise<Agent[]> {
    return this.parse(await this.agentSource.getAgents());
  }

  async updateAgent(updatedAgent: Agent) {
    this.agentSource.updateAgent(updatedAgent);
  }
}
