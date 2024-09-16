import { Agent } from "./AgentSchema";

import { AgentSource } from "./AgentSource"

import agents from "./agents.json";

class AgentLocalSource implements AgentSource {
  private agents = this.parse(agents)

  private parse(agents: any[]): Agent[] {
    return agents.map((agent) => ({
      id: agent.Id,
      image: agent.Image,
      agentType: agent.AgentType,
      name: agent.Name,
      salesCount: agent.SalesCount,
      phone: agent.Phone,
      priority: agent.Priority,
      discount: agent.Discount,
      email: agent.Email
    }));
  };

  getAgents(): Agent[] { 
    return this.agents;
  }
}

export default AgentLocalSource;