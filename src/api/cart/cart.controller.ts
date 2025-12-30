import { Router, Request, Response } from "express";
import { CartService } from "../../services/cart.service";
import { CartItem } from "../../domain/cart/types";

const router = Router();
const cartService = new CartService();

router.post("/calculate", (req: Request, res: Response) => {
    try {
        if (!req.body?.items) {
            return res.status(400).send({ message: 'Missing required field: items' });
        }
        
        const items: CartItem[] = req.body.items;
        const result = cartService.calculate(items);
        return res.json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Unexpected error" });
    }
});

export default router;
