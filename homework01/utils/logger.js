// module.exports = (prefix) => {
// 	return {
// 		log: (message) => console.log(`${prefix}: ${message}`),
// 		warn: (message) => console.error(`${prefix}: ${message}`)
// 	};
// };

import colors from "colors/safe.js";

export default function logger() {
	return {
		log: (message) => console.log(message),
		warn: (message) => console.error(colors.red(message))
	}
}
