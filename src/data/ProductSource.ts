import { Product } from "./ProductSchema";

export abstract class ProductSource {
    abstract getProducts(): Promise<Product[]>
}