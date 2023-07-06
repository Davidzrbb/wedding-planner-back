import {config} from "dotenv";
import express from "express";
import http from "http";
import sequelize from "./utils/mysql.connector";
import cors from "cors";
import {CategoryController} from "./controller/category.controller";
import {CardController} from "./controller/card.controller";
import {WishController} from "./controller/wish.controller";
import {ServiceProviderController} from "./controller/service-provider.controller";
import {ConnexionController} from "./controller/connexion.controller";

config();

async function startServer(): Promise<void> {

    sequelize.authenticate()
        .then(async () => {
            await sequelize.sync({alter: true});
            console.log("All models were synchronized successfully.");
        }).catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    const port = process.env.PORT || 3000;
    const app = express();
    const httpServer = http.createServer(app);
    app.use(cors({origin: process.env.FRONT_URL}));


    //controllers
    const categoryController = new CategoryController();
    app.use('/category', categoryController.buildRoutes());

    const cardController = new CardController();
    app.use('/card', cardController.buildRoutes());

    const wishController = new WishController();
    app.use('/wish', wishController.buildRoutes());

    const serviceProviderController = new ServiceProviderController();
    app.use('/service-provider', serviceProviderController.buildRoutes());

    const connexionController = new ConnexionController();
    app.use('/auth', connexionController.buildRoutes());

    httpServer.listen(port, () => console.log(`Listening on port ${port}`));
}

startServer().catch(console.error);