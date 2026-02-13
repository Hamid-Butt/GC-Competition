//HOME bottom line Effect
const navShop = document.getElementById("home");
const navBtns = document.getElementsByClassName("nav-buttons");
for (const key in navBtns) {
    if (!Object.hasOwn(navBtns, key)) continue;
    const element = navBtns[key];
    element.addEventListener("mouseover", () => {
        navShop.classList.remove("home-line");
    })
    element.addEventListener("mouseout", () => {
        navShop.classList.add("home-line");
    })
}
//Dealsection loop
function createProductsDisplay(obj, productDisplay, dealSec) {
    let newProductDisplay = productDisplay.cloneNode(true);
    let img = newProductDisplay.querySelector("img");
    img.src = obj.src;
    img.alt = obj.name;
    let cutPrice = newProductDisplay.querySelector(".cut-price").querySelector("span");
    let remPrice = newProductDisplay.querySelector(".rem-price").querySelector("span");
    let productName = newProductDisplay.querySelector(".deal-name").innerHTML = obj.name;
    let off = newProductDisplay.querySelector(".off");
    if (obj.off) {
        let discount = parseInt(obj.off) / 100 * parseInt(obj.price);
        let disPrice = parseInt(obj.price) - parseInt(discount);
        if (disPrice % 10 == 0)
            disPrice--;
        remPrice.innerHTML = " " + disPrice;
        cutPrice.innerHTML = " " + obj.price;
        off.innerHTML = obj.off + "% off";
    }
    else {
        off.remove();
        remPrice.innerHTML = " " + obj.price;
        newProductDisplay.querySelector(".cut-price").remove();
    }
    newProductDisplay.querySelector(".deal-hidden").querySelector("span").innerText = JSON.stringify(obj);
    dealSec.querySelector(".deals-container").insertAdjacentElement("beforeend", newProductDisplay);
}


let dealSections = document.querySelectorAll(".deals-section");
let productDisplay = document.querySelector(".deal-card");//innerHtml is a text and we cant clone that
document.querySelector(".deals-container").innerHTML = "";
dealSections.forEach(dealSec => {
    let cate = dealSec.previousElementSibling.querySelector(".tag-image-con").firstElementChild.innerHTML.trim().toLowerCase();
    products.forEach(e => {
        if (cate == "zero" && e.off !== 0)
            createProductsDisplay(e, productDisplay, dealSec);
        if( cate == "trending" && e.trending === true)
            createProductsDisplay(e, productDisplay, dealSec);
        if( cate === "giftcards" && e.category.toLowerCase() === "giftcards")
            createProductsDisplay(e, productDisplay, dealSec);
    })
})
//Visible Feedback
function visibleFeedback() {
    let feedback = document.getElementsByClassName("feedback");
    feedback = feedback[0];
    let feedbackBtnSec = document.getElementsByClassName("feedback-btn-p");
    feedbackBtnSec = feedbackBtnSec[0];
    feedback.classList.add("feedback-show");
    feedbackBtnSec.classList.add("hide");
}