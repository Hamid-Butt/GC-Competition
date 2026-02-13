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
let dealSections = document.querySelectorAll(".deals-section");
dealSections.forEach(dealSec => {
    let cate = dealSec.previousElementSibling.querySelector(".tag-image-con").firstElementChild.innerHTML.trim().toLowerCase();
    products.forEach(product => {
        if (cate == "zero" && product.off !== 0) //e.off === 0 means no discount but this control structure runs for discounted products
            createProductsDisplay(product, dealSec);
        if( cate == "trending" && product.trending === true)
            createProductsDisplay(product, dealSec);
        if( cate === "giftcards" && product.category.toLowerCase() === "giftcards")
            createProductsDisplay(product, dealSec);
    })
})

function createProductsDisplay(product, dealSec) {
    let dealCardHTML = `<div class="deal-card" onclick="productDes(this)">
                    <img src="" alt="">
                    <div class="deal-hidden" style="display: none;">
                        <div></div>
                        <span></span>
                    </div>
                    <span class="off">

                    </span>
                    <i class="fa-solid fa-heart white-heart" onclick="redHeart(event,this)"></i>
                    <div class="deal-name"></div>
                    <div class="deal-price flex">
                        <span class="cut-price"
                            style="text-decoration: line-through; color: #b12704 ;"><sup>PKR</sup><span>

                            </span></span>
                        <span class="rem-price"><sup>PKR</sup><span>

                            </span></span>
                    </div>
                </div>`;
    let dealCard = document.createElement("div");
    dealCard.innerHTML = dealCardHTML; //now the dealCArdHTML is like a child of dealCard, so ill use dealCard.firstElemntChild
    dealCard = dealCard.firstElementChild;
    let img = dealCard.querySelector("img");
    img.src = product.src;
    img.alt = product.name;
    let cutPrice = dealCard.querySelector(".cut-price").querySelector("span");
    let remPrice = dealCard.querySelector(".rem-price").querySelector("span");
    let productName = dealCard.querySelector(".deal-name").innerHTML = product.name;
    let off = dealCard.querySelector(".off");
    if (product.off) {
        let discount = parseInt(product.off) / 100 * parseInt(product.price);
        let disPrice = parseInt(product.price) - parseInt(discount);
        if (disPrice % 10 == 0)
            disPrice--;
        remPrice.innerHTML = " " + disPrice;
        cutPrice.innerHTML = " " + product.price;
        off.innerHTML = product.off + "% off";
    }
    else {
        off.remove();
        remPrice.innerHTML = " " + product.price;
        dealCard.querySelector(".cut-price").remove();
    }
    
    dealCard.querySelector(".deal-hidden").querySelector("span").innerText = JSON.stringify(product);//the only purpose of the line is that each card contains the product info
    dealSec.querySelector(".deals-container").insertAdjacentElement("beforeend", dealCard);
}



