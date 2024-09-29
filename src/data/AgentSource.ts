import { Agent, AgentWithoutId } from "./AgentSchema";
import { Sale } from "./SaleSchema";

export abstract class AgentSource {
    abstract getAgent(id: number): Promise<Agent>
    abstract getAgents(): Promise<Agent[]>
    abstract updateAgent(updatedAgent: Agent): Promise<void>
    abstract addAgent(agent: AgentWithoutId): Promise<void>
    abstract deleteAgent(id: number): Promise<void>
    abstract getSales(agentId: number): Promise<Sale[]>
    abstract addSale(agentId: number, sale: Sale, productId: number): Promise<void>
    abstract deleteSale(saleId: number): Promise<void>
}