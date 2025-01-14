import colors from "colors/safe";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { Writable } from "stream";

const COLORS_ENABLED = process.env.COLORS_ENABLED || 0;

const logStream: Writable = fs.createWriteStream(path.join("logs", "server.log"));


export default (moduleName: string) => {
	const coloredModuleName = COLORS_ENABLED === "1" ? colors.blue(moduleName) : moduleName;

	return {
		log: (message: string) => {
			const logMessage = `${coloredModuleName}: ${message}`;
			console.log(logMessage);
			logStream.write(`[LOG] ${logMessage}\n`);
		},
		warn: (message: string) => {
			const logMessage = `${coloredModuleName}: ${COLORS_ENABLED === "1" ? colors.red(message) : message}`;
			console.error(logMessage);
			logStream.write(`[WARN] ${logMessage}\n`);
		},
		error: (message: string) => {
			const logMessage = `${coloredModuleName}: ${COLORS_ENABLED === "1" ? colors.red(message) : message}`;
			console.error(logMessage);
			logStream.write(`[ERROR] ${logMessage}\n`);
		},
	};
};
