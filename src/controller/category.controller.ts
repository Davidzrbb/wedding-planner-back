import express, {Request, Response, Router} from "express";
import {CategoryProps, Category} from "../models/category";

export class CategoryController {
    getAllCategories(req: Request, res: Response) {
        const categories = Category.findAll();
        res.status(200).send({
            response: categories,
        });
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/', express.json(), this.getAllCategories.bind(this));
        return router;
    }
}