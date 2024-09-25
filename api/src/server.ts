import express, { Response } from "express";
import 'dotenv/config';
import reposControllers from "./repos/reposControllers";
import langsControllers from "./langs/langsControllers";

const app = express();
const port = process.env.EXPRESS_PORT;

app.get("/", (_, res: Response) => {
    res.status(200).send('Hello my friend');
});

app.get("/api", (_, res: Response) => {
    res.status(200).send('API endpoint');
});

app.use("/api/repos", reposControllers);
app.use("/api/langs", langsControllers);

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
});