// Variables
let menu: HTMLElement | null = document.getElementById("menu");
let links: HTMLElement | null = document.querySelector("nav .links");
// Toggle menu

if (menu !== null)
	menu.onclick = function () {
		if (links !== null) links.classList.toggle("show");
	};
