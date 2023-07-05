import {config} from "dotenv";
import express from "express";
import http from "http";

import cors from "cors";

config();

async function startServer(): Promise<void> {

    const db = require('./utils/mysql.connector');
    db.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        }).catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });
    const port = process.env.PORT || 3000;
    const app = express();
    const httpServer = http.createServer(app);
    app.use(cors({origin: process.env.FRONT_URL}));


    httpServer.listen(port, () => console.log(`Listening on port ${port}`));
}

startServer().catch(console.error);