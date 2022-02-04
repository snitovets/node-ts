/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;
beforeAll(async () => {
	mongo = new MongoMemoryServer();
	await mongo.start();

	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri, {
		useUnifiedTopology: true
	});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (const collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.connection.close();
	await mongo.stop();
});
