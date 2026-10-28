import { IDiscountProtocol } from "./interface/IDiscountProtocol";

export class NoDiscount implements IDiscountProtocol {
  apply(subtotal: number): number {
    return subtotal;
  }
}
