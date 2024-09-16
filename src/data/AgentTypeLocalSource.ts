import { AgentType } from "./AgentTypeSchema";

import { AgentTypeSource } from "./AgentTypeSource";

import agentTypes from "./agentTypes.json";

class AgentTypeLocalSource implements AgentTypeSource {
  private parse(agentTypes: any[]): AgentType[] {
    return agentTypes.map((agentType) => ({
      id: agentType.Id,
      title: agentType.Title,
    }));
  }

  getAgentTypes(): AgentType[] {
    return this.parse(agentTypes);
  }
}

export default AgentTypeLocalSource;
