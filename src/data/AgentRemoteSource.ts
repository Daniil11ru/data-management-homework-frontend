import dayjs from "dayjs";
import { Agent, AgentKey, AgentWithoutId } from "./AgentSchema";
import { AgentSource } from "./AgentSource";

import { Sale, SaleKey } from "./SaleSchema";

class AgentRemoteSource extends AgentSource {
  parseAgentForUpdate(agent: Agent): any {
    return {
      name: agent.title,
      address: agent.address,
      inn: agent.INN,
      kpp: agent.KPP,
      directorName: agent.directorName,
      agentTypeID: agent.agentTypeId,
      phone: agent.phone,
      priority: agent.priority,
      discount: agent.discount,
      email: agent.email,
      logo: agent.logo,
    };
  }

  private parseSale(sale: any): Sale {
    return {
      id: sale.ID,
      date: new Date(sale.SaleDate), // NOTE: без явного Date() поле будет невалидным
      productCount: sale.ProductCount,
      product: sale.Product,
      productId: sale.ProductID,
    };
  }

  private readonly ip = "89.110.118.205";

  async getAgent(id: number): Promise<Agent> {
    const response = await fetch(`http://${this.ip}/api/agents/${id}`);
    const agent = await response.json();

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

  async getAgents(): Promise<Agent[]> {
    const response = await fetch(`http://${this.ip}/api/agents`);
    const agents = await response.json();

    return agents.map((agent: any) => ({
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
    }));
  }

  async updateAgent(agent: Agent) {
    const agentWithoutId = this.parseAgentForUpdate(agent);

    try {
      const response = await fetch(
        `http://${this.ip}/api/agents/${agent.id}`,
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

  async addAgent(agent: AgentWithoutId): Promise<number | null> {
    try {
      const response = await fetch(`http://${this.ip}/api/agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: agent.title,
          agent_type: agent.agentTypeId,
          address: agent.address,
          inn: agent.INN,
          kpp: agent.KPP,
          director_name: agent.directorName,
          phone: agent.phone,
          priority: agent.priority,
          email: agent.email,
          logo: agent.logo,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(`Ошибка добавления агента: ${response.status}`);
      }

      const result = await response.json();
      console.log("Агент добавлен:", result);
      return result.agent_id;
    } catch (error) {
      console.error("Ошибка:", error);
      return null;
    }
  }

  async deleteAgent(id: number) {
    try {
      const response = await fetch(`http://${this.ip}/api/agents/${id}`, {
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
      `http://${this.ip}/api/agents/${agentId}/sales`
    );
    const sales = await response.json();

    return sales.map((sale: any) => this.parseSale(sale));
  }

  async addSale(agentId: number, sale: Sale) {
    try {
      const response = await fetch(`http://${this.ip}/api/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
          product_id: sale.productId,
          product_count: sale.productCount,
          sale_date: dayjs(sale.date).format("YYYY-MM-DD"),
        }),
      });

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
        `http://${this.ip}/api/sales/${saleId}`,
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
