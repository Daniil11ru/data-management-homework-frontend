import { Agent } from "./AgentSchema";

export interface AgentSource {
    getAgents(): Promise<any[]>
    updateAgent(updatedAgent: Agent): Promise<void>
}