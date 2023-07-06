import express, {Request, Response, Router} from "express";
import {CategoryProps, Category} from "../models/category";

export class CategoryController {
    async getAllCategories(req: Request, res: Response) {
        try {
            const category = await Category.findAll();
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

    async createCategory(req: Request, res: Response) {
        try {
            const category = await Category.create(req.body);
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

    async deleteCategory(req: Request, res: Response) {
        try {
            const category = await Category.findByPk(req.params.id);
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

    async putCategory(req: Request, res: Response) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (category === null) {
                return res.status(400).send({
                    response: false,
                });
            }
            const newCategory = await category.update(req.body);
            return res.status(200).send({
                response: newCategory,
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
        router.get('/', express.json(), this.getAllCategories.bind(this));
        router.post('/', express.json(), this.createCategory.bind(this));
        router.delete('/:id', express.json(), this.deleteCategory.bind(this));
        router.put('/:id', express.json(), this.putCategory.bind(this));
        return router;
    }
}