import { Agent, AgentKey, AgentWithoutId } from "./AgentSchema";
import { AgentSource } from "./AgentSource";

import { Sale, SaleKey } from "./SaleSchema";

class AgentRemoteSource extends AgentSource {
  parseAgent(agent: any): Agent {
    return {
      id: agent.ID,
      title: agent.Title,
      address: agent.Address,
      INN: agent.INN,
      KPP: agent.KPP,
      directorName: agent.DirectorName,
      agentTypeId: agent.AgentTypeID,
      salesCount: agent.SalesCount,
      phone: agent.Phone,
      priority: agent.Priority,
      discount: agent.Discount,
      email: agent.Email,
      logo: agent.Logo,
      totalSales: agent.TotalSales,
    };
  }

  parseAgentForUpdate(agent: Agent): any {
    return {
      name: agent.title,
      address: agent.address,
      INN: agent.INN,
      KPP: agent.KPP,
      directorName: agent.directorName,
      agentTypeID: agent.agentTypeId,
      salesCount: agent.salesCount,
      phone: agent.phone,
      priority: agent.priority,
      discount: agent.discount,
      email: agent.email,
      logo: agent.logo,
      totalSales: agent.totalSales,
    };
  }

  private parseSale(sale: any): Sale {
    return {
      date: new Date(sale.SaleDate), // NOTE: без явного Date() поле будет невалидным
      productCount: sale.ProductCount,
      product: sale.Product,
    };
  }

  async getAgent(id: number): Promise<Agent> {
    const response = await fetch(`http://89.110.118.205/api/agents/${id}`);
    const agent = await response.json();

    return this.parseAgent(agent);
  }

  async getAgents(): Promise<Agent[]> {
    const response = await fetch("http://89.110.118.205/api/agents");
    const agents = await response.json();

    return agents.map((agent: any) => this.parseAgent(agent));
  }

  async updateAgent(agent: Agent) {
    const agentWithoutId = this.parseAgentForUpdate(agent);

    console.log(agentWithoutId);

    try {
      const response = await fetch(
        `http://89.110.118.205/api/agents/${agent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agentWithoutId),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка обновления агента: ${response.status}`);
      }

      const result = await response.json();
      console.log("Агент обновлен:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  async addAgent(agent: AgentWithoutId) {
    try {
      const response = await fetch("http://89.110.118.205/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agent),
      });

      if (!response.ok) {
        throw new Error(`Ошибка добавления агента: ${response.status}`);
      }

      const result = await response.json();
      console.log("Агент добавлен:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  async deleteAgent(id: number) {
    try {
      const response = await fetch(`http://89.110.118.205/api/agents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Ошибка удаления агента: ${response.status}`);
      }

      const result = await response.json();
      console.log("Агент удален:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  async getSales(agentId: number): Promise<Sale[]> {
    const response = await fetch(
      `http://89.110.118.205/api/agents/${agentId}/sales`
    );
    const sales = await response.json();

    return sales.map((sale: any) => this.parseSale(sale));
  }

  async addSale(agentId: number, sale: Sale, productId: number) {
    try {
      const response = await fetch(
        `http://89.110.118.205/api/sales`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ agent_id: agentId, product_id: productId, product_count: sale.productCount }),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка добавления продажи: ${response.status}`);
      }

      const result = await response.json();
      console.log("Продажа добавлена:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  async deleteSale(saleId: number) {
    try {
      const response = await fetch(
        `http://89.110.118.205/api/sales/${saleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка удаления продажи: ${response.status}`);
      }

      const result = await response.json();
      console.log("Продажа удалена:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
}

export default AgentRemoteSource;
