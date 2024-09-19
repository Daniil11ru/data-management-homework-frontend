import { AgentType } from "./AgentTypeSchema";

export interface AgentTypeSource {
    getAgentTypes(): Promise<any[]>
}