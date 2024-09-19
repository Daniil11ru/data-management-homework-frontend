import { AgentType } from "./AgentTypeSchema";

import { AgentTypeSource } from "./AgentTypeSource";

class AgentTypeLocalSource implements AgentTypeSource {
  async getAgentTypes(): Promise<any[]> {
    const response = await fetch('http://localhost:5000/agents/types');
    const types = await response.json();

    return types;
  }
}

export default AgentTypeLocalSource;
