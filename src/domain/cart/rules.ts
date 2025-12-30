import { CartItem } from "./types";
import { roundToTwo } from "./helpers";

// Rule A: 10% discount on electronics
export function applyElectronicsDiscount(
    items: CartItem[],
    subtotal: number
): { electronicsDiscount: number; subtotalAfterElectronicsDiscount: number } {
    const electronicsDiscount = items
        .filter(item => item.category === 'electronics')
        .reduce((totalDiscount, item) => {
            const itemSubtotal = item.price * item.quantity;
            return totalDiscount + (itemSubtotal * 0.10);
        }, 0);

    const subtotalAfterElectronicsDiscount = roundToTwo(subtotal - electronicsDiscount);
    return {
        electronicsDiscount: roundToTwo(electronicsDiscount),
        subtotalAfterElectronicsDiscount
    };
}

// Rule B: Apply €10 discount if total after Rule A > 50
export function applyBulkDiscount(subtotalAfterElectronicsDiscount: number): { bulkDiscount: number; totalAfterDiscounts: number } {
    const bulkDiscount = subtotalAfterElectronicsDiscount > 50 ? 10 : 0;
    const totalAfterDiscounts = roundToTwo(subtotalAfterElectronicsDiscount - bulkDiscount);
    return { bulkDiscount, totalAfterDiscounts };
}

// Rule C: Apply 20% VAT
export function applyVat(totalAfterDiscounts: number): { vatAmount: number; totalPayable: number } {
    const vatAmount = roundToTwo(totalAfterDiscounts * 0.20);
    const totalPayable = roundToTwo(totalAfterDiscounts + vatAmount);
    return { vatAmount, totalPayable };
}

