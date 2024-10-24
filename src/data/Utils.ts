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


export function rgbToHex(rgb: string): string {
  // Извлекаем значения R, G и B с помощью регулярного выражения
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) {
    throw new Error("Invalid RGB format");
  }

  // Преобразуем значения R, G и B в HEX
  const r = parseInt(result[0], 10).toString(16).padStart(2, "0");
  const g = parseInt(result[1], 10).toString(16).padStart(2, "0");
  const b = parseInt(result[2], 10).toString(16).padStart(2, "0");

  // Объединяем и возвращаем HEX-строку
  return `${r}${g}${b}`;
}
