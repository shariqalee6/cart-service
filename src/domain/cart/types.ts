export interface CartItem {
    name: string;
    price: number;
    category: string;
    quantity: number;
}

export interface CartCalculationResult {
    subtotal: number;
    discountsApplied: number;
    totalAfterDiscounts: number;
    vatAmount: number;
    totalPayable: number;
}
