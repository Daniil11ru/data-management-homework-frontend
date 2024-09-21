import { Agent } from "./AgentSchema";

export abstract class AgentSource {
    abstract getAgents(): Promise<Agent[]>
    abstract updateAgent(updatedAgent: Agent): Promise<void>
}