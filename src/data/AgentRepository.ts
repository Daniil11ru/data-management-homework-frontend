import { AgentSource } from "./AgentSource";

import { Agent } from "./AgentSchema";

export class AgentRepository {
  private agentSource: AgentSource;

  constructor(agentSource: AgentSource) {
    this.agentSource = agentSource;
  }

  async getAgents(): Promise<Agent[]> {
    return (await this.agentSource.getAgents());
  }

  async updateAgent(updatedAgent: Agent) {
    this.agentSource.updateAgent(updatedAgent);
  }
}
