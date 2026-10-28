import { IDiscountProtocol } from "./interface/IDiscountProtocol";

export class PercentageDiscount implements IDiscountProtocol {
  constructor(private readonly percentage: number) {}

  apply(subtotal: number): number {
    return Math.round(subtotal * (1 - this.percentage / 100));
  }
}
