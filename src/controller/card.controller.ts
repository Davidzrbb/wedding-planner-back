import express, {Request, Response, Router} from "express";
import {CardProps, Card} from "../models/card";

export class CardController {
    async getAllCards(req: Request, res: Response) {
        try {
            const card = await Card.findAll({
                where: {
                    fk_category: req.params.id
                }
            });
            res.status(200).send({
                response: card,
            });
        } catch (e: any) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    async createCard(req: Request, res: Response) {
        try {
            const card = await Card.create(req.body);
            res.status(201).send({
                response: card,
            });
        } catch (e: any) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    async deleteCard(req: Request, res: Response) {
        try {
            const card = await Card.findByPk(req.params.id);
            if (card !== null) {
                await card.destroy();
            }
            res.status(200).send({
                response: true,
            });
        } catch (e: any) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    async putCard(req: Request, res: Response) {
        try {
            const card = await Card.findByPk(req.params.id);
            if (card === null) {
                return res.status(400).send({
                    response: false,
                });
            }
            const newCard = await card.update(req.body);

            return res.status(200).send({
                response: newCard,
            });
        } catch (e: any) {
            return res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/:id', express.json(), this.getAllCards.bind(this));
        router.post('/', express.json(), this.createCard.bind(this));
        router.put('/:id', express.json(), this.putCard.bind(this));
        router.delete('/:id', express.json(), this.deleteCard.bind(this));
        return router;
    }
}