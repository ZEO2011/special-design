/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./dist/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				"main-orange": "#FF9800",
				"main-pink": "#E91E63",
				"main-green": "#009688",
				"main-blue": "#03A9F4",
				"main-grass": "#4CAF50",
			},
			screens: {
				xd: { min: "888px" },
			},
		},
	},
	plugins: [],
};
