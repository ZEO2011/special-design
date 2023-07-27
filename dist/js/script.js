"use strict";
let html = document.querySelector("html");
let allSects = document.querySelectorAll("section");
let menu = document.getElementById("menu");
let menuIcon = document.querySelector("#menu i");
let linksContainer = document.querySelector("nav .links");
let links = document.querySelectorAll("nav .links li");
let landingBg = document.querySelector(".landing");
let settings = document.querySelector(".settings-box");
let settingsIcon = document.querySelector(".settings-box i");
let colorSetting = document.querySelectorAll(".settings-box .colors li");
let randomBgSetting = document.querySelectorAll(".settings-box .randomBg button");
let bulletsSetting = document.querySelectorAll(".settings-box .bullets button");
let randomInt;
let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];
let randomImageInt = setInterval(() => {
    let randomNum = Math.floor(Math.random() * images.length);
    if (landingBg !== null)
        landingBg.style.backgroundImage = `url(../src/assets/imgs/landing/${images[randomNum]})`;
}, 10000);
if (localStorage.getItem("main-color") !== null) {
    let savedColor = eval(`${localStorage.getItem("main-color")}`);
    html === null || html === void 0 ? void 0 : html.style.setProperty("--main-color", savedColor);
    colorSetting.forEach((button) => {
        if (button.getAttribute("data-color") === savedColor) {
            colorSetting.forEach((button) => button.classList.remove("active"));
            button.classList.add("active");
        }
    });
}
function removeAllExcept(status) {
    randomBgSetting.forEach((button) => {
        button.classList.remove("active");
        if (button.getAttribute("random") === status) {
            button.classList.add("active");
        }
    });
}
if (localStorage.getItem("randomImage") !== null) {
    if (localStorage.getItem("randomImage") === "false") {
        clearInterval(randomImageInt);
        clearInterval(randomInt);
        removeAllExcept("false");
    }
    else {
        removeAllExcept("true");
    }
}
if (menu !== null)
    menu.onclick = function () {
        if (linksContainer !== null)
            linksContainer.classList.toggle("show");
        if (menuIcon !== null)
            menuIcon.classList.toggle("fa-xmark");
    };
if (settingsIcon !== null)
    settingsIcon.onclick = () => settings === null || settings === void 0 ? void 0 : settings.classList.toggle("show");
function settingsFunc(parent) {
    parent.forEach((button) => {
        button.addEventListener("click", function () {
            parent.forEach((button) => button.classList.remove("active"));
            button.classList.add("active");
        });
    });
}
colorSetting.forEach((button) => {
    settingsFunc(colorSetting);
    button.addEventListener("click", function (event) {
        html === null || html === void 0 ? void 0 : html.style.setProperty("--main-color", button.getAttribute("data-color"));
        localStorage.setItem("main-color", JSON.stringify(button.getAttribute("data-color")));
    });
});
randomBgSetting.forEach((button) => {
    settingsFunc(randomBgSetting);
    button.addEventListener("click", function () {
        if (button.getAttribute("random") === "false") {
            clearInterval(randomImageInt);
            clearInterval(randomInt);
            localStorage.setItem("randomImage", "false");
        }
        else {
            randomInt = setInterval(() => {
                let randomNum = Math.floor(Math.random() * images.length);
                if (landingBg !== null)
                    landingBg.style.backgroundImage = `url(../../src/assets/imgs/landing/${images[randomNum]})`;
            }, 10000);
            localStorage.setItem("randomImage", "true");
        }
    });
});
settingsFunc(bulletsSetting);
let observer = new IntersectionObserver((sections) => {
    sections.forEach((section) => {
        section.target.classList.toggle("animate", section.isIntersecting);
        if (section.isIntersecting)
            observer.unobserve(section.target);
        if (section.isIntersecting) {
            if (section.target.id === "skills") {
                let progresses = document.querySelectorAll("#skills .progresses-container ul li progress");
                progresses.forEach((progress) => {
                    if (progress !== null) {
                        let goal = progress.getAttribute("data-goal");
                        if (goal !== null)
                            progress.setAttribute("value", goal);
                    }
                });
            }
        }
    });
}, {
    threshold: 0.5,
});
allSects.forEach((sect) => {
    observer.observe(sect);
});
//# sourceMappingURL=script.js.map