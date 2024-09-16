import { AgentSource } from "./AgentSource"

import { Agent } from "./AgentSchema";

export class AgentRepository {
    private agents: Agent[];

    constructor(agentsSource: AgentSource) {
        this.agents = agentsSource.getAgents();
    }

    getAgents() : Agent[] {
        return this.agents;
    }
}