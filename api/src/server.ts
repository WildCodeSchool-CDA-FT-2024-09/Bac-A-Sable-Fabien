import express from "express";
import 'dotenv/config';
import router from "./router";
import { AppDataSource } from "./database/data-source";
import "reflect-metadata";
import cors from "cors";
const app = express();
const { EXPRESS_PORT, CORS_FRONTEND_URL } = process.env;

// cors
app.use(cors({
    origin: [CORS_FRONTEND_URL as string]
}));

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