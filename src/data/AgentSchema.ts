import { z } from "zod";

const AgentSchema = z.object({
  id: z.number(),
  title: z.string(),
  address: z.string(),
  INN: z.string(),
  KPP: z.string(),
  directorName: z.string(),
  agentTypeId: z.number(),
  agentTypeTitle: z.string(),
  salesCount: z.number(),
  phone: z.string(),
  priority: z.number(),
  discount: z.number(),
  email: z.string(),
  logo: z.string(),
  totalSales: z.number()
});

type Agent = z.infer<typeof AgentSchema>;

const AgentKey = {
  id: "id",
  logo: "logo",
  agentTypeId: "agentTypeId",
  agentTypeTitle: "agentTypeTile",
  title: "title",
  salesCount: "salesCount",
  phone: "phone",
  priority: "priority",
  discount: "discount",
  email: "email",
  totalSales: "totalSales",
  address: "address",
  INN: "INN",
  KPP: "KPP",
  directorName: "directorName",
}

export { AgentSchema, AgentKey };
export type { Agent };
