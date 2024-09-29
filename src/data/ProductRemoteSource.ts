import { Product } from "./ProductSchema";
import { ProductSource } from "./ProductSource";

class ProductRemoteSource extends ProductSource {
  private parse(product: any): Product {
    return {
      id: product.ID,
      title: product.Title,
    };
  }

  async getProducts(): Promise<Product[]> {
    const response = await fetch(`http://89.110.118.205/api/products`);
    const products = await response.json();

    return products.map((product: any) => this.parse(product));
  }
}

export default ProductRemoteSource;
