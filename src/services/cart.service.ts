import type { CartItem, CartCalculationResult } from '../domain/cart/types';
import {
    validateCartItems,
    calculateSubtotal,
    roundToTwo
} from '../domain/cart/helpers';
import {
    applyElectronicsDiscount,
    applyBulkDiscount,
    applyVat
} from '../domain/cart/rules';

export class CartService {
    calculate(items: CartItem[]): CartCalculationResult {
        // Validate input
        const validationErrors = validateCartItems(items);
        if (validationErrors.length > 0) {
            throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
        }

        // Handle empty cart
        if (items.length === 0) {
            return {
                subtotal: 0,
                discountsApplied: 0,
                totalAfterDiscounts: 0,
                vatAmount: 0,
                totalPayable: 0
            };
        }

        // Step 1: Calculate subtotal
        const subtotal = calculateSubtotal(items);

        // Step 2: Rule A - Electronics discount (10%)
        const { electronicsDiscount, subtotalAfterElectronicsDiscount } = applyElectronicsDiscount(items, subtotal);

        // Step 3: Rule B - Bulk discount (€10 if > €50 after Rule A)
        const { bulkDiscount, totalAfterDiscounts } = applyBulkDiscount(subtotalAfterElectronicsDiscount);

        // Step 4: Rule C - VAT (20%)
        const { vatAmount, totalPayable } = applyVat(totalAfterDiscounts);

        return {
            subtotal: roundToTwo(subtotal),
            discountsApplied: roundToTwo(electronicsDiscount + bulkDiscount),
            totalAfterDiscounts,
            vatAmount,
            totalPayable
        };
    }
}
