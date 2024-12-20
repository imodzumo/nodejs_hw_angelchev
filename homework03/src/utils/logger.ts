// @ts-ignore
import colors from "colors/safe.js";
import "dotenv/config";
// @ts-ignore
import fs from "fs";
import path from "path";

const COLORS_ENABLED = process.env.COLORS_ENABLED || 0;

// Create a write stream for logging
const logFilePath = path.join(__dirname, "./logs/server.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

export default (moduleName: string) => {
	const coloredModuleName = COLORS_ENABLED === "1" ? colors.blue(moduleName) : moduleName;

	const writeLog = (level: string, message: string) => {
		const formattedMessage = `${new Date().toISOString()} [${level}] ${coloredModuleName}: ${message}`;
		logStream.write(formattedMessage + "\n");
		return formattedMessage;
	};

	return {
		log: (message: string) => console.log(writeLog("INFO", message)),
		warn: (message: string) => {
			const coloredMessage = COLORS_ENABLED === "1" ? colors.red(message) : message;
			console.error(writeLog("WARN", coloredMessage), message);
		},
		error: (message: string, s: string) => {
			const coloredMessage = COLORS_ENABLED === "1" ? colors.red(message) : message;
			console.error(writeLog("ERROR", coloredMessage), message);
		}
	};
};
