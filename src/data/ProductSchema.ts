import { z } from "zod";

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
});

type Product = z.infer<typeof ProductSchema>;

const ProductKey = {
  id: "id",
  title: "title"
};

export { ProductSchema, ProductKey };
export type { Product };
