import { ProductSource } from "./ProductSource";

import { Product, ProductKey } from "./ProductSchema";

export class ProductRepository {
  private productSource: ProductSource;

  constructor(productSource: ProductSource) {
    this.productSource = productSource;
  }

  async getProducts(): Promise<Product[]> {
    return (await this.productSource.getProducts());
  }
}
