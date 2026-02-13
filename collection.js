let lastScrollY = window.scrollY;
let nav = document.getElementsByTagName("nav")[0];
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        let currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY)
            nav.style.transform = "translateY(-100%)";
        else
            nav.style.transform = "translateY(0px)";
        lastScrollY = currentScrollY;
    }
})

//Collections bottom line Effect
const navCollection = document.getElementById("collections");
const navBtns = document.getElementsByClassName("nav-buttons");
for (const key in navBtns) {
    if (!Object.hasOwn(navBtns, key)) continue;
    const element = navBtns[key];
    element.addEventListener("mouseover", () => {
        navCollection.classList.remove("home-line");
    })
    element.addEventListener("mouseout", () => {
        navCollection.classList.add("home-line");
    })
}