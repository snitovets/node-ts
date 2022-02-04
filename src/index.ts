// import mongoose from "mongoose";
import { app } from "./app";
import logger from "./winston";

const start = async () => {
	/** Environment variables check before run 
	if (!process.env.MONGO_URI) {
	 	throw new Error("MONGO_URI must be defined");
	}
	*/
};

start().then(async () => {
	/** Connect to the mongodb 
	await mongoose.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
	});
	logger.info("MongoDB connected!");
	*/

	app.listen(3000, () => {
		logger.info("API listening on port 3000!");
	});
});
