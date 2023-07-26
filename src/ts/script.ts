// Variables
let html: HTMLHtmlElement | null = document.querySelector("html");
let menu: HTMLElement | null = document.getElementById("menu");
let menuIcon: HTMLElement | null = document.querySelector("#menu i");
let linksContainer: HTMLElement | null = document.querySelector("nav .links");
let links: NodeListOf<Element> = document.querySelectorAll("nav .links li");
let landingBg: HTMLElement | null = document.querySelector(".landing");
let settings: HTMLElement | null = document.querySelector(".settings-box");
let settingsIcon: HTMLElement | null =
	document.querySelector(".settings-box i");
let colorSetting: NodeListOf<Element> = document.querySelectorAll(
	".settings-box .colors li",
);
let randomBgSetting: NodeListOf<Element> = document.querySelectorAll(
	".settings-box .randomBg button",
);
let bulletsSetting: NodeListOf<Element> = document.querySelectorAll(
	".settings-box .bullets button",
);

// Random background

// randomImage function

// array of images

let images: string[] = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

let randomImageInt = setInterval(() => {
	let randomNum: number = Math.floor(Math.random() * images.length);
	if (landingBg !== null)
		landingBg.style.backgroundImage = `url(../../src/assets/imgs/landing/${images[randomNum]})`;
}, 10000);

// check if there is any saved color

if (localStorage.getItem("main-color") !== null) {
	let savedColor = eval(`${localStorage.getItem("main-color")}`);
	html?.style.setProperty("--main-color", savedColor);
	colorSetting.forEach((button) => {
		if (button.getAttribute("data-color") === savedColor) {
			colorSetting.forEach((button) =>
				button.classList.remove("active"),
			);
			button.classList.add("active");
		}
	});
}

// check if user wasn't wan't to random image

// make clicked button active
function removeAllExcept(status: string) {
	randomBgSetting.forEach((button) => {
		button.classList.remove("active");
		if (button.getAttribute("random") === status) {
			button.classList.add("active");
		}
	});
}

if (localStorage.getItem("randomImage") !== null) {
	if (localStorage.getItem("randomImage") === "false") {
		// clear interval of random image
		clearInterval(randomImageInt);
		removeAllExcept("false");
	} else {
		removeAllExcept("true");
	}
}

// Toggle menu

if (menu !== null)
	menu.onclick = function () {
		if (linksContainer !== null) linksContainer.classList.toggle("show");
		if (menuIcon !== null) menuIcon.classList.toggle("fa-xmark");
	};

// Settings box

if (settingsIcon !== null)
	settingsIcon.onclick = () => settings?.classList.toggle("show");

// options boxes

// setting active class to clicked button
function settingsFunc(parent: NodeListOf<Element>) {
	parent.forEach((button: Element) => {
		button.addEventListener("click", function () {
			parent.forEach((button: Element) =>
				button.classList.remove("active"),
			);
			button.classList.add("active");
		});
	});
}

colorSetting.forEach((button: Element) => {
	settingsFunc(colorSetting);
	button.addEventListener("click", function (event) {
		// set the data-color to html element
		html?.style.setProperty(
			"--main-color",
			button.getAttribute("data-color"),
		);
		// save chosen color
		localStorage.setItem(
			"main-color",
			JSON.stringify(button.getAttribute("data-color")),
		);
	});
});

randomBgSetting.forEach((button: Element) => {
	settingsFunc(randomBgSetting);
	button.addEventListener("click", function () {
		if (button.getAttribute("random") === "false") {
			// clear interval of random image & save it in localStorage
			clearInterval(randomImageInt);
			localStorage.setItem("randomImage", "false");
		} else {
			setInterval(() => {
				let randomNum: number = Math.floor(
					Math.random() * images.length,
				);
				if (landingBg !== null)
					landingBg.style.backgroundImage = `url(../../src/assets/imgs/landing/${images[randomNum]})`;
			}, 10000);
			localStorage.setItem("randomImage", "true");
		}
	});
});
settingsFunc(bulletsSetting);
