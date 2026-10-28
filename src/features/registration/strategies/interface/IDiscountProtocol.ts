export type DiscountContext = {
  registeredAt: Date;
  category: string;
  couponCode?: string;
};

export interface IDiscountProtocol {
  apply(subtotal: number, context: DiscountContext): number;
}
