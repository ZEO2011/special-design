// Variables
let html: HTMLHtmlElement | null = document.querySelector("html");
let allSects: NodeListOf<Element> = document.querySelectorAll("section");
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
let randomInt: any;

// Random background

// array of images

let images: string[] = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

let randomImageInt = setInterval(() => {
	let randomNum: number = Math.floor(Math.random() * images.length);
	if (landingBg !== null)
		landingBg.style.backgroundImage = `url(../src/assets/imgs/landing/${images[randomNum]})`;
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
		clearInterval(randomInt);
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
			clearInterval(randomInt);
			localStorage.setItem("randomImage", "false");
		} else {
			randomInt = setInterval(() => {
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

// observe all sections for animate it

let observer: IntersectionObserver = new IntersectionObserver(
	(sections) => {
		sections.forEach((section) => {
			section.target.classList.toggle(
				"animate",
				section.isIntersecting,
			);
			if (section.isIntersecting) observer.unobserve(section.target);
			// if current section is skills
			if (section.isIntersecting) {
				if (section.target.id === "skills") {
					// increase the value to data-goal value
					let progresses: NodeListOf<Element> =
						document.querySelectorAll(
							"#skills .progresses-container ul li progress",
						);
					progresses.forEach((progress: Element | null) => {
						if (progress !== null) {
							let goal: string | null =
								progress.getAttribute("data-goal");
							if (goal !== null)
								progress.setAttribute("value", goal);
						}
					});
				}
			}
		});
	},
	{
		threshold: 0.5,
	},
);

allSects.forEach((sect: Element) => {
	observer.observe(sect);
});
