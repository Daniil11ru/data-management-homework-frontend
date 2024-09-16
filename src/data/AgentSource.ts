import { Agent } from "./AgentSchema";

export interface AgentSource {
    getAgents(): Agent[]
}