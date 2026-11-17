

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const themeBtn = document.getElementById("themeBtn");

menuBtn.onclick = function() {
    menu.classList.toggle("active");
};

document.querySelectorAll("nav a").forEach(function(link) {
    link.onclick = function() {
        menu.classList.remove("active");
    };
});

themeBtn.onclick = function() {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.innerHTML = "☀";
    } else {
        themeBtn.innerHTML = "☾";
    }
};

const revealItems = document.querySelectorAll(".reveal");

function showItems() {
    revealItems.forEach(function(item) {
        const position = item.getBoundingClientRect().top;

        if (position < window.innerHeight - 80) {
            item.classList.add("show");
        }
    });
}

window.addEventListener("scroll", showItems);
window.addEventListener("load", showItems);
