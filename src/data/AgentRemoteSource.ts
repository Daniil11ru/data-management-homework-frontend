import { Agent, AgentKey } from "./AgentSchema";
import { AgentSource } from "./AgentSource";

class AgentRemoteSource implements AgentSource {
  async getAgents(): Promise<any[]> { 
    const response = await fetch('http://89.110.118.205/api/agents');
    const agents = await response.json();

    return agents;
  }

  private capitalizeKeys = (obj: any): any => {
    const newObj: any = {};
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        newObj[capitalizedKey] = obj[key];
      }
    }
  
    return newObj;
  };

  async updateAgent(agent: Agent) {
    const agentNoId = {
      title: agent.title,
      agentTypeId: agent.agentTypeId,
      address: agent.address,
      INN: agent.INN,
      KPP: agent.KPP,
      directorName: agent.directorName,
      phone: agent.phone,
      email: agent.email,
      logo: agent.logo,
      priority: agent.priority,
      agentType: agent.agentType,
      salesCount: agent.salesCount,
      totalSales: agent.totalSales,
      discount: agent.discount
    }
 
    try {
      const response = await fetch(`http://89.110.118.205/agents/update/${agent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentNoId),
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