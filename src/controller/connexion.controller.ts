import express, {Request, Response, Router} from "express";
import {Connexion} from "../models/connexion";
import {SecurityUtils} from "../utils";

export class ConnexionController {
    async checkToken(req: Request, res: Response) {
        try {
            const connexion = await Connexion.findOne({
                where: {
                    token: req.body.token
                }
            });
            if (connexion === null) {
                return res.status(400).send({
                    response: false,
                });
            }
            return res.status(200).send({
                response: true,
            });
        } catch (e: any) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    async connexion(req: Request, res: Response) {
        try {
            const connexion = await Connexion.findOne({
                where: {
                    login: req.body.login,
                    password: SecurityUtils.sha512(req.body.password)
                }
            });
            if (connexion === null) {
                return res.status(400).send({
                    response: false,
                });
            }
            return res.status(200).send({
                response: connexion.token,
            });
        } catch (e: any) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }


    async inscription(req: Request, res: Response) {
        try {
            req.body.token = SecurityUtils.generateToken();
            req.body.password = SecurityUtils.sha512(req.body.password);
            const connexion = await Connexion.create(req.body);
            res.status(201).send({
                response: connexion.token,
            });
        } catch (e: any) {
            res.status(400).send({
                response: false,
                message: e.message,
            });
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.post('/token', express.json(), this.checkToken.bind(this));
        router.post('/', express.json(), this.connexion.bind(this));
        router.post('/inscription', express.json(), this.inscription.bind(this));
        return router;
    }
}