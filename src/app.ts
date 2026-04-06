import express, { Application } from "express";
import cors from "cors";
import urlShortnerRoute from "./modules/urlShortner/urlShortner.route";
import errorHandler from "./middleware/error.middleware";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/", urlShortnerRoute);

app.use(errorHandler);

export default app;
