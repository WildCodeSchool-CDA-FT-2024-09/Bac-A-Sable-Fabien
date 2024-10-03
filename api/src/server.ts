import express from "express";
import * as dotenv from "dotenv";
import router from "./router";
import { AppDataSource } from "./database/data-source";
import "reflect-metadata";
import cors from "cors";
dotenv.config();
const { EXPRESS_PORT, CORS_FRONTEND_URLS } = process.env;
const app = express();

// cors
const corsUrls = CORS_FRONTEND_URLS?.split(",");
app.use(
    cors({
        origin: corsUrls,
        optionsSuccessStatus: 200
    })
);

// enabling json handling
app.use(express.json());

// setting routes
app.use('/api', router);

// server running
app.listen(EXPRESS_PORT, async () => {
    // initializing data source
    await AppDataSource.initialize();
    console.log(`Server running http://localhost:${EXPRESS_PORT}`);
});