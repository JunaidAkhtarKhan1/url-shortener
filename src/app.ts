import express, { Application } from "express";
import cors from "cors";
import urlShortnerRoute from "./modules/urlShortner/urlShortner.route.js";
import errorHandler from "./middleware/error.middleware.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.path);
  next();
});

app.use("/", urlShortnerRoute);

app.use(errorHandler);

export default app;
