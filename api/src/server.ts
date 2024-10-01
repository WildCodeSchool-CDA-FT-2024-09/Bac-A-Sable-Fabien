import express from "express";
import 'dotenv/config';
import router from "./router";
import { AppDataSource } from "./database/data-source";
import "reflect-metadata";
const app = express();
const port = process.env.EXPRESS_PORT;

// enabling json handling
app.use(express.json());

// settings routes
app.use('/api', router);

// server running
app.listen(port, async () => {
    // initializing data source
    await AppDataSource.initialize();
    console.log(`Server running http://localhost:${port}`);
});