import express from "express";
import 'dotenv/config';
import router from "./router";
import { AppDataSource } from "./data-source";

const app = express();
const port = process.env.EXPRESS_PORT;

// initialzing data source
AppDataSource.initialize()
    .then(() => {
        console.log("Data source initialized");
    })
    .catch((error) => {
        console.error("Error during data source initialization", error);
    });

// enabling json handling
app.use(express.json());

// settings routes
app.use('/api', router);

// server running
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
});