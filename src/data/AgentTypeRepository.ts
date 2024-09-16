import { AgentTypeSource } from "./AgentTypeSource";

import { AgentType } from "./AgentTypeSchema";

export class AgentTypeRepository {
  private agentTypes: AgentType[];

  constructor(agentsSource: AgentTypeSource) {
    this.agentTypes = agentsSource.getAgentTypes();
  }

  getAgentTypes(): AgentType[] {
    return this.agentTypes;
  }

  getAgentTypesMap(): Map<number, AgentType> {
    const agentTypesMap = new Map<number, AgentType>();

    this.agentTypes.forEach((agentType) => {
      agentTypesMap.set(agentType.id, agentType);
    });

    return agentTypesMap;
  }

  getTitles(): string[] {
    return this.agentTypes.map((agentType) => agentType.title);
  }

  getId(title: string): number | undefined {
    const parsedAgentTypes = this.getAgentTypes();

    const foundAgentType = parsedAgentTypes.find(
      (agentType) => agentType.title === title
    );

    return foundAgentType ? foundAgentType.id : undefined;
  }
}
