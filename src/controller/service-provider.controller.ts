import express, {Request, Response, Router} from "express";
import {ServiceProvider} from "../models/service-provider";

export class ServiceProviderController {
    async getAllServiceProvider(req: Request, res: Response) {
        try {
            const category = await ServiceProvider.findAll({
                where: {
                    fk_category: req.params.id
                }
            });
            res.status(200).send({
                response: category,
            });
        } catch (e) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    async createServiceProvider(req: Request, res: Response) {
        try {
            const category = await ServiceProvider.create(req.body);
            res.status(201).send({
                response: category,
            });
        } catch (e) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    async deleteServiceProvider(req: Request, res: Response) {
        try {
            const category = await ServiceProvider.findByPk(req.params.id);
            if (category !== null) {
                await category.destroy();
            }
            res.status(200).send({
                response: true,
            });
        } catch (e) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/:id', express.json(), this.getAllServiceProvider.bind(this));
        router.post('/', express.json(), this.createServiceProvider.bind(this));
        router.delete('/:id', express.json(), this.deleteServiceProvider.bind(this));
        return router;
    }
}