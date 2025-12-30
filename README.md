# Cart Calculation Service (Node.js + TypeScript)

This is a small **MVP web service** built with Node.js and TypeScript.
It exposes a single endpoint where a client can send a list of cart items and receive the final price, including discounts and VAT.

The goal was to implement the required calculation rules in a clear way and structure the logic so it is easy to understand and extend.

---

## How to run the service

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the compiled build:

```bash
npm start
```

Run unit tests:

```bash
npm test
```

The service runs on port **3000** by default.

---

## Endpoint

**POST** `/cart/calculate`

### Example request body

```json
{
  "items": [
    { "name": "Laptop", "price": 1200, "category": "electronics", "quantity": 1 },
    { "name": "Coffee Beans", "price": 20, "category": "groceries", "quantity": 2 },
    { "name": "Book", "price": 15, "category": "books", "quantity": 1 }
  ]
}
```

The API returns a full price breakdown including discounts and VAT.

---

## Application structure

The application is split into three main parts.

**API layer**
This receives HTTP requests and returns responses. It does not contain price calculation logic. It simply validates input and forwards it to the service.

**Service layer**
This layer coordinates the calculation process. It calls the different discount rules in the required order and assembles the final result object.

**Domain layer**
This contains the actual business logic: subtotal calculation, validation, and the discount rule functions. These are kept independent from the web framework so they are easy to test and reuse.

This separation keeps responsibilities clear and avoids mixing HTTP code with pricing logic.

---

## Calculation rules implemented

The rules are applied in the following order:

1. **Electronics discount**
   10% off each item in the `electronics` category

2. **Bulk discount**
   If the cart total (after the electronics discount) is over €50, a flat €10 is subtracted

3. **VAT**
   20% VAT is applied to the price after all discounts

---

## Tests

The service includes **four** unit tests that focus on the price calculation logic:

* bulk discount is applied when the threshold is exceeded
* bulk discount is not applied when the threshold is not reached
* electronics items receive a 10% discount
* a mixed cart scenario checks subtotal, discounts, VAT, and total payable

---

## Edge cases considered

The following situations were handled:

* empty item list
* invalid data types
* negative prices
* zero or negative quantities
* missing required fields
* unknown categories (treated as normal items without special rules)

---

## Adding new discount rules

New pricing rules can be added by:

1. creating a new function in `domain/cart/rules.ts`
2. calling it from the service in the required order
3. optionally adding a corresponding unit test

This avoids rewriting existing logic and keeps the rules isolated from the HTTP layer.