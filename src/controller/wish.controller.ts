import express, {Request, Response, Router} from "express";
import {Wish} from "../models/wish";

export class WishController {
    async getAllWish(req: Request, res: Response) {
        try {
            const wish = await Wish.findAll({
                where: {
                    fk_category: req.params.id
                }
            });
            res.status(200).send({
                response: wish,
            });
        } catch (e) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    async putWish(req: Request, res: Response) {
        try {
            const wish = await Wish.findOne(
                {
                    where: {
                        fk_category: req.params.id
                    }
                }
            )
            let newWish;
            if (wish === null) {
                newWish = await Wish.create(req.body);
            } else {
                newWish = await wish.update(req.body);
            }
            return res.status(200).send({
                response: newWish,
            });
        } catch (e) {
            return res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/:id', express.json(), this.getAllWish.bind(this));
        router.put('/:id', express.json(), this.putWish.bind(this));
        return router;
    }
}