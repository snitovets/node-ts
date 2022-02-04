import { errorHandler, NotFoundError } from "@poonkt/common";
import express from "express";
import morgan from "morgan";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import logger from "./winston";

import { route } from "./routes/route";

const app = express();
app.set("trust proxy", true);
app.use(morgan("combined", { stream: { write: (message) => logger.http(message) } }));
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "dev"
	})
);

app.use(route);

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
