import { Agent } from "./AgentSchema";
import { AgentSource } from "./AgentSource";

class AgentLocalSource implements AgentSource {
  async getAgents(): Promise<any[]> { 
    const response = await fetch('http://localhost:5000/agents');
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
    console.log(this.capitalizeKeys(agent));

    try {
      const response = await fetch(`http://localhost:5000/agents/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.capitalizeKeys(agent)),
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

export default AgentLocalSource;