"use strict";
let menu = document.getElementById("menu");
let links = document.querySelector("nav .links");
if (menu !== null)
    menu.onclick = function () {
        if (links !== null)
            links.classList.toggle("show");
    };
//# sourceMappingURL=script.js.map