import {
  DiscountContext,
  IDiscountProtocol,
} from "./interface/IDiscountProtocol";

export class CupomDiscount implements IDiscountProtocol {
  apply(subtotal: number, context: DiscountContext): number {
    const { couponCode } = context;

    if (couponCode?.toUpperCase() === "CUPOM10") {
      const discount = subtotal * 0.9;
      return Math.round(discount * 100) / 100;
    }

    return subtotal;
  }
}
