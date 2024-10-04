import { z } from "zod";

const SaleSchema = z.object({
  id: z.number(),
  date: z.date(),
  productCount: z.number(),
  product: z.string().optional(),
  productId: z.number(),
});

type Sale = z.infer<typeof SaleSchema>;

const SaleKey = {
  date: "date",
  productCount: "productCount",
  product: "product",
  productId: "productId"
}

export { SaleSchema, SaleKey };
export type { Sale }
