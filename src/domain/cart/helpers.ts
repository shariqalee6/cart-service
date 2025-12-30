import { CartItem } from './types';

// Basic validation
export function validateCartItems(items: CartItem[]): string[] {
    const errors: string[] = [];

    if (!Array.isArray(items)) {
        errors.push('Items must be an array');
        return errors;
    }

    items.forEach((item, index) => {
        if (!item.name || typeof item.name !== 'string') {
            errors.push(`Item ${index}: name is required and must be a string`);
        }
        if (typeof item.price !== 'number' || item.price < 0) {
            errors.push(`Item ${index}: price must be a non-negative number`);
        }
        if (typeof item.category !== 'string') {
            errors.push(`Item ${index}: category must be a string`);
        }
        if (typeof item.quantity !== 'number' || item.quantity < 0) {
            errors.push(`Item ${index}: quantity must be a non-negative number`);
        }
    });

    return errors;
}

// Sum all items before discounts
export function calculateSubtotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Ensures consistent financial rounding
export function roundToTwo(value: number): number {
    return Math.round(value * 100) / 100;
}


