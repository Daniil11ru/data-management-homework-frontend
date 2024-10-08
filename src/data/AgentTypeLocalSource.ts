import { AgentType } from "./AgentTypeSchema";

import { AgentTypeSource } from "./AgentTypeSource";

class AgentTypeLocalSource extends AgentTypeSource {
  private parse(agentType: any): AgentType {
    return {
        id: agentType.Id,
        title: agentType.Title
    }
  }

  async getAgentTypes(): Promise<any[]> {
    const response = await fetch('http://localhost:5000/agents/types');
    const agentTypes = await response.json();
    return agentTypes.map((agentType: any) => this.parse(agentType));
  }
}

export default AgentTypeLocalSource;
