import colors from "colors/safe.js";
import "dotenv/config";

const COLORS_ENABLED = process.env.COLORS_ENABLED || 0;

export default (moduleName) => {
	const coloredModuleName = COLORS_ENABLED === "1" ? colors.blue(moduleName) : moduleName;

	return {
		log: (message) => console.log(`${coloredModuleName}: ${message}`),
		warn: (message) => {
			const coloredMessage = COLORS_ENABLED === "1" ? colors.red(message) : message;
			console.error(`${coloredModuleName}: ${coloredMessage}`);
		},
	};
};
