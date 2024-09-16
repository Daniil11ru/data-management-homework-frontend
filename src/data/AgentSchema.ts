import { z } from "zod";

const AgentSchema = z.object({
  id: z.number(),
  image: z.string(),
  agentType: z.number(),
  name: z.string(),
  salesCount: z.number(),
  phone: z.string(),
  priority: z.number(),
  discount: z.number(),
  email: z.string(),
});

type Agent = z.infer<typeof AgentSchema>;

const AgentKey = {
  id: "id",
  image: "image",
  agentType: "agentType",
  name: "name",
  salesCount: "salesCount",
  phone: "phone",
  priority: "priority",
  discount: "discount",
  email: "email",
}

export { AgentSchema, AgentKey };
export type { Agent };
