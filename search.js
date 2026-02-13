
//Getting search query
let NavInput = document.querySelector("#navbar-input");
let NavBarSearch = localStorage.getItem("searchKeyword");
let searchKeyWord =  NavInput.value = NavBarSearch;
let searchProducts = [];
let dealSection = document.querySelector(".deals-section");
let productDisplay = document.querySelector(".deal-card");
searchProductFinder();

let searchIcon = document.querySelector(".fa-magnifying-glass");
//Searching when on Search Page By Clicking on Icon
searchIcon.addEventListener("click",e=>{
    searchProducts = []; 
    searchKeyWord = NavInput.value.trim().replace(/\s+/g,'');
    searchProductFinder();
})
//Searching when on Search Page By Pressing Enter key
NavInput.addEventListener("keydown",e=>{
    if(e.key === "Enter"){
         searchProducts = []; 
    searchKeyWord = NavInput.value.trim().replace(/\s+/g,'');
    searchProductFinder();
    }
})

function searchProductFinder(){
    products.forEach( obj => {
    for (const key in obj) {
        if (!Object.hasOwn(obj, key)) continue;
        
        let element = obj[key];
        if( typeof element === "string"){
             if(element.toLowerCase().trim().replace(/\s+/g,'').includes(searchKeyWord)){
                if(!searchProducts.includes(obj)){
                    searchProducts.push(obj)
                 }
            }   
        }
             
    }
});
//Showing searched products

dealSection.innerHTML = "";
if(searchProducts.length > 0){
    searchProducts.forEach(obj=>{
                createProductsDisplay(obj, productDisplay,dealSection);
})
}else
    alert("No Matched Found");
}
function createProductsDisplay(obj, productDisplay,dealSection) {
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
    dealSection.insertAdjacentElement("beforeend", newProductDisplay);
    NavInput.value = "";
}










