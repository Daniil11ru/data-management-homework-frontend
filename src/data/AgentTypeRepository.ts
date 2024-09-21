import { AgentTypeSource } from "./AgentTypeSource";

import { AgentType } from "./AgentTypeSchema";

export class AgentTypeRepository {
  private agentTypeSource: AgentTypeSource;

  constructor(agentTypeSource: AgentTypeSource) {
    this.agentTypeSource = agentTypeSource;
  }

  async getAgentTypes(): Promise<AgentType[]> {
    return this.agentTypeSource.getAgentTypes();
  }
}
