import { z } from "zod";

const SaleSchema = z.object({
  date: z.date(),
  productCount: z.number(),
  product: z.string()
});

type Sale = z.infer<typeof SaleSchema>;

const SaleKey = {
  date: "date",
  productCount: "productCount",
  product: "product"
}

export { SaleSchema, SaleKey };
export type { Sale }
