require("dotenv").config();

module.exports = {
	my_var: "My simple value",
	root: {
		leve1: {
			level2: "tree item"
		}
	},
	my_array: process.env.MY_ARRAY?.split(',')
}
