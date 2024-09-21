import { AgentType } from "./AgentTypeSchema";

export abstract class AgentTypeSource {
    abstract getAgentTypes(): Promise<AgentType[]>
}