import request from "supertest";
import { app } from "../../app";

it("returns 200 and hello world string", async () => {
	const response = await request(app).get("/api").expect(200);
	const { message } = response.body;

	expect(message).toBe("Hello world!");
});
