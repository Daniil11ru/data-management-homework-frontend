import { AgentType } from "./AgentTypeSchema";

import { AgentTypeSource } from "./AgentTypeSource";

class AgentTypeRemoteSource extends AgentTypeSource {
  private parse(agentType: any): AgentType {
    return {
        id: agentType.ID,
        title: agentType.Title
    }
  }

  async getAgentTypes(): Promise<AgentType[]> {
    const response = await fetch("http://89.110.118.205/api/agent-types");
    const agentTypes = await response.json();
    console.log(agentTypes);
    return agentTypes.map((agentType: any) => this.parse(agentType));
  }
}

export default AgentTypeRemoteSource;
