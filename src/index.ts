import express, {Express} from "express";
import { PORT } from "./config";

const app: Express = express();

require('./startup/routes')(app);

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});