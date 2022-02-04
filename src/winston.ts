import winston from "winston";

const options = {
	file: {
		level: "info",
		filename: "./logs/app.log",
		maxsize: 5242880,
		maxFiles: 5,
		json: true,
		format: winston.format.logstash()
	},
	console: {
		level: "debug",
		silent: process.env.NODE_ENV === "test",
		format: winston.format.combine(
			winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss"
			}),
			winston.format.json(),
			winston.format.ms(),
			winston.format.errors({ stack: true }),
			winston.format.colorize({ level: true }),
			winston.format.printf(({ level, message, timestamp, ms }) => {
				return `${timestamp} ${level}: ${message} ${ms} `;
			})
		)
	}
};

const logger = winston.createLogger({
	defaultMeta: { service: "some-service-name" },
	transports: [
		/* new winston.transports.File(options.file),*/
		new winston.transports.Console(options.console)
	],
	exitOnError: true
});

console.debug = (...args) => logger.debug.call(logger, ...args);
console.error = (...args) => logger.error.call(logger, ...args);

export default logger;
