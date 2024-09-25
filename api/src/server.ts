import express from "express";
import 'dotenv/config';
import router from "./router";

const app = express();
const port = process.env.EXPRESS_PORT;

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
});