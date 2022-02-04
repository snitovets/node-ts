import express, { Request, Response } from "express";

const router = express.Router();

interface MessageResponse {
	message: string;
}

type ResBody = MessageResponse;

router.get("/api", async (_: Request, res: Response<ResBody>) => {
	res.status(200).send({ message: "Hello world!" });
});

export { router as route };
