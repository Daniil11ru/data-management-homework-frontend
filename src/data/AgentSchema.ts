import { z } from "zod";

const AgentSchema = z.object({
  id: z.number(),
  title: z.string(),
  address: z.string(),
  INN: z.string(),
  KPP: z.string(),
  directorName: z.string(),
  agentType: z.string().optional(),
  agentTypeId: z.number(),
  salesCount: z.number(),
  phone: z.string(),
  priority: z.number(),
  discount: z.number(),
  email: z.string(),
  logo: z.string(),
  totalSales: z.number()
});
type Agent = z.infer<typeof AgentSchema>;

const AgentWithoutIdSchema = AgentSchema.omit({ id: true });
type AgentWithoutId = z.infer<typeof AgentWithoutIdSchema>;

const AgentKey = {
  id: "id",
  logo: "logo",
  agentType: "agentType",
  agentTypeId: "agentTypeId",
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

export { AgentSchema, AgentWithoutIdSchema, AgentKey };
export type { Agent, AgentWithoutId };
