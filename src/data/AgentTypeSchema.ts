import { z } from "zod";

const AgentTypeSchema = z.object({
  id: z.number(),
  title: z.string()
});

type AgentType = z.infer<typeof AgentTypeSchema>;

export { AgentTypeSchema };
export type { AgentType }
