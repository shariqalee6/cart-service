import { CartService } from "../services/cart.service";

const service = new CartService();

describe("CartService price calculation", () => {

    // bulk discount should apply (> €50 after electronics discount)
    it("applies the €10 bulk discount when the threshold is exceeded", () => {
        const items = [
            { name: "Backpack", price: 60, category: "accessories", quantity: 1 },
        ];

        const result = service.calculate(items);

        expect(result.discountsApplied).toBe(10);
    });

    // bulk discount should not apply (≤ €50)
    it("does not apply the bulk discount when the total is 50 or below", () => {
        const items = [
            { name: "Book", price: 20, category: "books", quantity: 1 },
            { name: "Pen", price: 5, category: "stationery", quantity: 2 },
        ];

        const result = service.calculate(items);

        expect(result.discountsApplied).toBe(0);
    });

    // electronics items get 10% off
    it("applies a 10% discount to electronics items", () => {
        const items = [
            { name: "Laptop", price: 1000, category: "electronics", quantity: 1 },
        ];

        const result = service.calculate(items);

        // subtotal stays the same
        expect(result.subtotal).toBe(1000);

        // 10% off electronics = 900 and bulk discount of 10€ is 890
        expect(result.totalAfterDiscounts).toBe(890);
    });

    // full calculation behavior
    it("calculates subtotal, discounts, VAT and total payable correctly for a mixed cart", () => {
        const items = [
            { name: "Laptop", price: 1200, category: "electronics", quantity: 1 },
            { name: "Coffee Beans", price: 20, category: "groceries", quantity: 2 },
            { name: "Book", price: 15, category: "books", quantity: 1 },
        ];

        const result = service.calculate(items);

        expect(result.subtotal).toBe(1255);
        expect(result.discountsApplied).toBe(130);
        expect(result.totalAfterDiscounts).toBe(1125);
        expect(result.vatAmount).toBe(225);
        expect(result.totalPayable).toBe(1350);
    });
});
