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

//Red Heart
function redHeart(e, heart) {
    e.stopPropagation();
    heart.classList.toggle("red-heart");
    //Favorites Appearence Box
    document.querySelector(".favProducts").classList.add("favProducts-style");
    document.querySelector(".favProducts").querySelector("div").classList.add("favProducts-show");
    document.querySelector(".favProducts").querySelector("div").classList.remove("favProducts-hide");
    if (heart.classList.contains("red-heart")) {
        document.querySelector(".favProducts").querySelector("div").innerHTML = "Add To Favorites";
    } else {
        document.querySelector(".favProducts").querySelector("div").innerHTML = "Removed From Favorites";
    }
    setTimeout(() => {
        document.querySelector(".favProducts").querySelector("div").innerHTML = "";
        document.querySelector(".favProducts").classList.remove("favProducts-style");
        document.querySelector(".favProducts").querySelector("div").classList.remove("favProducts-show");
        document.querySelector(".favProducts").querySelector("div").classList.add("favProducts-hide");
    }, 500);
}



//Product Description Box Appearence
let productClick = document.querySelector(".product-onclick");
let productClickChild = productClick.querySelector(".product-onclick-div");
let productClickLeftImg = productClick.querySelector(".product-onclick-l-con").querySelector(".img");
let productClickRight = productClick.querySelector(".product-onclick-r-con");
let IncDeincInput = document.querySelector("#inc-deinc-input");
function productDes(productDisplay2) {
    productClick.classList.add("product-onclick-toggle");
    document.body.style.overflow = "hidden";
    //Adding Style to Left and Right Boxes
    productClick.querySelector(".product-onclick-l-con").classList.add("product-onclick-l-con-style");
    productClick.querySelector(".product-onclick-r-con").classList.add("product-onclick-r-con-style");

    //Fetching Data


    let temObj = JSON.parse(productDisplay2.querySelector(".deal-hidden").querySelector("span").innerText);
    let src = productDisplay2.querySelector("img").src;
    // productClickLeftImg.style.backgroundImage = `url(${temObj.src})`; This one is not working, it should be.
    productClickLeftImg.style.backgroundImage = `url(${src})`;
    productClickRight.querySelector("h3").innerText = temObj.name.toUpperCase();
    productClickRight.querySelector(".company-title").innerText = "Company Name: ";
    productClickRight.querySelector(".company-name").innerText = temObj.companyName;
    if (temObj.off) {
        productClickRight.querySelector(".price-title").closest(".company-con").style.left = "-17px";
        productClickRight.querySelector(".price-title").innerText = "Discounted Price: ";
        let value = temObj.price - parseInt(temObj.price * temObj.off / 100);
        if (value % 10 == 0) {
            value--;
        }
        productClickRight.querySelector(".price-name").innerText = value;
        productClickRight.querySelector(".discount-title").innerText = "Discount:";
        productClickRight.querySelector(".discount-name").innerText = temObj.off + "%";

    } else {
        productClickRight.querySelector(".price-title").innerText = "Price: "
        productClickRight.querySelector(".price-title").closest(".company-con").style.left = "17px";
        productClickRight.querySelector(".price-name").innerText = temObj.price;
    }


    productClickRight.querySelector(".onclick-des").innerText = temObj.des;
    productClickRight.querySelector(".inc-box").innerText = "+";
    productClickRight.querySelector(".inputCountStorage").innerText = JSON.stringify(temObj);

    IncDeincInput.classList.replace("inc-deinc-input", "inc-deinc-input-show");
    productClickRight.querySelector(".deinc-box").innerText = "-";
    productClickRight.lastElementChild.classList.add("onclick-btn", "btn");
    productClickRight.querySelector(".onclick-btn").innerText = "Add To Cart ";
    
}
// Increment and Decrement in Products Quantity
function IncInput() {
    document.querySelector(".deinc-box").style.color = "#dddddd";
    IncDeincInput.value = Number(IncDeincInput.value) + 1;
}
function DeIncInput(e) {
    if (Number(IncDeincInput.value) > 0)
        IncDeincInput.value = Number(IncDeincInput.value) - 1;
    else
        e.style.color = "gray";
}
//If the user has logged in, then it automatically displys his name
let userData = localStorage.getItem("username"); //obj
userData = JSON.parse(userData);
if (userData) {
    if (Date.now() < userData.time + 1000 * 60 * 5) {
        let loginBtn = document.querySelector("#login");
        loginBtn.innerText = userData.name;
        loginBtn.style.color = "white";
        loginBtn.style.pointerEvents = "none";
        loginBtn.style.userSelect = "none";
    }
}
//Add to CArt Btn working of upper animation and Taking to login page
function addToCart(cartBtn) {
    if (userData) {
        if (Date.now() < userData.time + 1000 * 60 * 5) {
            let loginBtn = document.querySelector("#login");
            loginBtn.innerText = userData.name;
            loginBtn.style.color = "white";
            loginBtn.style.pointerEvents = "none";
            loginBtn.style.userSelect = "none";
            //Upper animated Box Appeared to Show items are added to cart
            document.querySelector(".favProducts").classList.add("favProducts-style");
            document.querySelector(".favProducts").querySelector("div").classList.add("favProducts-show");
            document.querySelector(".favProducts").querySelector("div").classList.remove("favProducts-hide");
            if (Number(IncDeincInput.value) > 0) {
                document.querySelector(".favProducts").querySelector("div").innerHTML = "ADDED TO CART";
                //Have taken value from inputCountStorage div, and used in this function
                let temObj = JSON.parse(cartBtn.previousElementSibling.innerText);
                //Type of IncDeincInput.value is string, therefore
                temObj.count = Number(IncDeincInput.value);
                //Finding whether obj in array is similar to cureent one, if it is then add the count
                let MatchingObj = ProductsOnAddToCArt.find(e => e.name === temObj.name ); //if find then put in MatchingObj
                    if(MatchingObj){
                        MatchingObj.count += temObj.count; 
                    }
                    else{
                        ProductsOnAddToCArt.push(temObj);
                    }
             //Declare at 165 line
                
                IncDeincInput.value = 1;
                BoxClose();
            }
            else
                document.querySelector(".favProducts").querySelector("div").innerHTML = "SELECT QUANTITY OF PRODUCTS";
        } else {
            localStorage.removeItem("username");
            window.location.href = "Login.html";
        }
    }
    else {
        //Redirection
        window.location.href = "Login.html";
    }
    setTimeout(() => {
        document.querySelector(".favProducts").querySelector("div").innerHTML = "";
        document.querySelector(".favProducts").classList.remove("favProducts-style");
        document.querySelector(".favProducts").querySelector("div").classList.remove("favProducts-show");
        document.querySelector(".favProducts").querySelector("div").classList.add("favProducts-hide");
    }, 500);
}


//Stoping Propogation of Child to Parent
productClickChild.addEventListener("click", e => {
    e.stopPropagation();
})

//Increment and Decrement for CArt Section
//multiple cards are displaying and have same id, so its not working, use this
function cartIncInput(e) {
    let parent = e.closest(".cart-inc-deinc-box");
   let input = parent.querySelector("input");
    input.value = Number(input.value) + 1;
   let total = parent.nextElementSibling.querySelector(".total");
   let temprice = parent.previousElementSibling.querySelector(".price").querySelector("div");
   total.innerText = Number(temprice.innerText)*Number(input.value);

}
function cartDeIncInput(e) {
  let parent = e.closest(".cart-inc-deinc-box");
   let input = parent.querySelector("input");
    if (Number(input.value) > 1){
         input.value = Number(input.value) - 1;
        let total = parent.nextElementSibling.querySelector(".total");
   let temprice = parent.previousElementSibling.querySelector(".price").querySelector("div");
   total.innerText = Number(temprice.innerText)*Number(input.value);
    }
    else
        e.style.color = "gray";
}
//Click On Shopping Cart Icon
let ProductsOnAddToCArt = [];
let cartIcon = document.querySelector(".fa-cart-shopping");
let cartSection = document.querySelector(".cart-section");

let cart = document.querySelector(".cart");
let cartCard = document.querySelector(".cart-card");    //Dont copy innerHtml as it is a text
//cart.innerHTML = ""; im moving it inside as i need to clean the section when icon is pressed
cartIcon.addEventListener("click", e=>{
   if(ProductsOnAddToCArt.length > 0){
     cartSection.classList.toggle("cart-section-show");
    cartSection.classList.toggle("cart-section-hide");
    cart.innerHTML = "";
    document.body.style.overflow = "hidden";
    // console.log(ProductsOnAddToCArt);
    ProductsOnAddToCArt.forEach(obj=>{
        let TempCartCard = cartCard.cloneNode(true);
        TempCartCard.querySelector("img").src = obj.src;
        TempCartCard.querySelector("img").alt = obj.name;
        TempCartCard.querySelector(".name").innerText = obj.name;
        TempCartCard.querySelector(".company").innerText = obj.companyName;
        if(obj.off === 0){
            TempCartCard.querySelector(".price").querySelector("div").innerText = obj.price;
        TempCartCard.querySelector(".total").innerText = obj.count * obj.price;
        }
    else{
        if(parseInt(obj.price - obj.price*obj.off/100)%10 === 0){
            TempCartCard.querySelector(".price").querySelector("div").innerText = parseInt(obj.price - obj.price*obj.off/100) - 1;
        TempCartCard.querySelector(".total").innerText = obj.count * (parseInt(obj.price - obj.price*obj.off/100) - 1);

        }
        else{
            TempCartCard.querySelector(".price").querySelector("div").innerText = parseInt(obj.price - obj.price*obj.off/100);
             TempCartCard.querySelector(".total").innerText = obj.count * parseInt(obj.price - obj.price*obj.off/100);
        }
    }
        TempCartCard.querySelector("#cart-input").value = obj.count;

        cart.insertAdjacentElement("beforeend",TempCartCard);
    })
   }else{
    alert("Cart Is Empty")
   }
})
cart.addEventListener("click",e=>{
    e.stopPropagation();
})
cartSection.addEventListener("click",e=>{
    e.stopPropagation();
    cartSection.classList.add("cart-section-hide");
    cartSection.classList.remove("cart-section-show");
    document.body.style.overflow = "auto";
})

//Final Output Function
let finalValueArr = [];
function FinalizeFunc(btn){
    let FCartSec = btn.closest(".cart-section");
    let FCartCard = FCartSec.querySelectorAll(".cart-card");
    FCartCard.forEach(card=>{
     let FTotal = card.querySelector(".cart-total").querySelector(".total");
     finalValueArr.push(Number(FTotal.innerText));
    })
    let sum = 0;
    finalValueArr.forEach(e=>{
        sum += e;
    })
    alert(`Your Final Amount is ${sum}`);
    finalValueArr = [];
    ProductsOnAddToCArt = [];
}



//Product Description Box Dsappearence
//Working with Add to Cart Btn
function BoxClose() {

    productClick.classList.remove("product-onclick-toggle");
    productClick.querySelector(".product-onclick-l-con").classList.remove("product-onclick-l-con-style");
    productClick.querySelector(".product-onclick-r-con").classList.remove("product-onclick-r-con-style");
    productClickRight.querySelector("h3").innerText = "";
    productClickRight.querySelector(".company-title").innerText = "";
    productClickRight.querySelector(".company-name").innerText = "";
    productClickRight.querySelector(".price-title").innerText = ""
    productClickRight.querySelector(".price-name").innerText = "";
    productClickRight.querySelector(".onclick-des").innerText = "";
    productClickRight.querySelector(".discount-title").innerText = "";
    productClickRight.querySelector(".discount-name").innerText = "";
    productClickRight.querySelector(".inc-box").innerText = "";
    IncDeincInput.classList.replace("inc-deinc-input-show", "inc-deinc-input");
    productClickRight.querySelector(".deinc-box").innerText = "";
    productClickRight.lastElementChild.classList.remove("onclick-btn", "btn");
    productClickRight.lastElementChild.innerText = "";
    document.body.style.overflow = "auto";

}
//Work With user click on light black space  
productClick.addEventListener("click", e => {
    productClick.classList.remove("product-onclick-toggle");
    productClick.querySelector(".product-onclick-l-con").classList.remove("product-onclick-l-con-style");
    productClick.querySelector(".product-onclick-r-con").classList.remove("product-onclick-r-con-style");
    productClickRight.querySelector("h3").innerText = "";
    productClickRight.querySelector(".company-title").innerText = "";
    productClickRight.querySelector(".company-name").innerText = "";
    productClickRight.querySelector(".price-title").innerText = ""
    productClickRight.querySelector(".price-name").innerText = "";
    productClickRight.querySelector(".onclick-des").innerText = "";
    productClickRight.querySelector(".discount-title").innerText = "";
    productClickRight.querySelector(".discount-name").innerText = "";
    productClickRight.querySelector(".inc-box").innerText = "";
    IncDeincInput.classList.replace("inc-deinc-input-show", "inc-deinc-input");
    productClickRight.querySelector(".deinc-box").innerText = "";
    productClickRight.lastElementChild.classList.remove("onclick-btn", "btn");
    productClickRight.lastElementChild.innerText = "";
    document.body.style.overflow = "auto";
})

