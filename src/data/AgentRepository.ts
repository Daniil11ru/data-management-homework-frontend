import { AgentSource } from "./AgentSource";

import { Agent, AgentWithoutId } from "./AgentSchema";
import { Sale, SaleKey } from "./SaleSchema"

export class AgentRepository {
  private agentSource: AgentSource;

  constructor(agentSource: AgentSource) {
    this.agentSource = agentSource;
  }

  async getAgents(): Promise<Agent[]> {
    return (await this.agentSource.getAgents());
  }

  async getAgent(id: number): Promise<Agent> {
    return (await this.agentSource.getAgent(id));
  }

  async updateAgent(updatedAgent: Agent) {
    this.agentSource.updateAgent(updatedAgent);
  }

  async addAgent(agent: AgentWithoutId): Promise<number | null> {
    return this.agentSource.addAgent(agent);
  }

  async deleteAgent(id: number) {
    this.agentSource.deleteAgent(id);
  }

  async getSales(agentId: number): Promise<Sale[]> { 
    return (await this.agentSource.getSales(agentId));
  }

  async addSale(agentId: number, sale: Sale) {
    this.agentSource.addSale(agentId, sale);
  }

  async deleteSale(saleId: number) {
    this.agentSource.deleteSale(saleId);
  }
}
