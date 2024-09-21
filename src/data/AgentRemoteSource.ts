import { Agent, AgentKey } from "./AgentSchema";
import { AgentSource } from "./AgentSource";

class AgentRemoteSource extends AgentSource {
  private parse(agent: any): Agent {
    return {
      id: agent.ID,
      title: agent.Title,
      address: agent.Address,
      INN: agent.INN,
      KPP: agent.KPP,
      directorName: agent.DirectorName,
      agentTypeId: agent.AgentTypeID,
      agentTypeTitle: agent.AgentType,
      salesCount: agent.SalesCount,
      phone: agent.Phone,
      priority: agent.Priority,
      discount: agent.Discount,
      email: agent.Email,
      logo: agent.Logo,
      totalSales: agent.TotalSales,
    };
  }

  async getAgents(): Promise<Agent[]> { 
    const response = await fetch('http://89.110.118.205/api/agents');
    const agents = await response.json();

    return agents.map((agent: any) => this.parse(agent));
  }

  async updateAgent(agent: Agent) {
    const agentWithoutId = Object.fromEntries(
      Object.entries(agent).filter(([key]) => key !== AgentKey.id)
    );
 
    try {
      const response = await fetch(`http://89.110.118.205/agents/update/${agent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentWithoutId),
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка обновления агента: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Агент обновлен:', result);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  
}

export default AgentRemoteSource;