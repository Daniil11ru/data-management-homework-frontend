import { AgentTypeSource } from "./AgentTypeSource";

import { AgentType } from "./AgentTypeSchema";

export class AgentTypeRepository {
  private agentTypeSource: AgentTypeSource;

  constructor(agentTypeSource: AgentTypeSource) {
    this.agentTypeSource = agentTypeSource;
  }

  private parse(agentTypes: any[]): AgentType[] {
    return agentTypes.map((agentType) => ({
      id: agentType.Id,
      title: agentType.Title,
    }));
  }

  async getAgentTypes(): Promise<AgentType[]> {
    return this.parse(await this.agentTypeSource.getAgentTypes());
  }

  async getAgentTypesMap(): Promise<Map<number, AgentType>> {
    const agentTypesMap = new Map<number, AgentType>();

    (await this.getAgentTypes()).forEach((agentType) => {
      agentTypesMap.set(agentType.id, agentType);
    });

    return agentTypesMap;
  }

  async getTitles(): Promise<string[]> {
    return (await this.getAgentTypes()).map((agentType) => agentType.title);
  }

  async getId(title: string): Promise<number | undefined> {
    const parsedAgentTypes = await this.getAgentTypes();

    const foundAgentType = parsedAgentTypes.find(
      (agentType) => agentType.title === title
    );

    return foundAgentType ? foundAgentType.id : undefined;
  }
}
