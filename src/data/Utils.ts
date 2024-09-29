import { Sale } from "./SaleSchema";

export enum SaleOperationType {
  ADD,
  DELETE,
}

export class SaleOperation {
  type: SaleOperationType;
  sale: Sale;
  productId: number;
  constructor(type: SaleOperationType, sale: Sale, productId: number) {
    this.type = type;
    this.sale = sale;
    this.productId = productId;
  }
}

export enum SaleSource {
  REMOTE,
  LOCAL,
}

export const capitalizeKeys = (obj: any): any => {
  const newObj: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      newObj[capitalizedKey] = obj[key];
    }
  }

  return newObj;
};
