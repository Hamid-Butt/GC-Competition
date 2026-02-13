//Sending SeachData To LocalStorage
let NavInput = document.querySelector("#navbar-input");
let searchIcon = document.querySelector(".fa-magnifying-glass");
let NavBarSearch;
//Searching  Clicking on Icon
searchIcon.addEventListener("click",()=>{
    if(NavInput.value.trim() !== ''){
        NavBarSearch =  NavInput.value.toLowerCase().trim().replace(/\s+/g,'');
        localStorage.setItem("searchKeyword",NavBarSearch);
        window.location.href = "search.html";
    }else
        alert("Input Field Is Empty")
})
//Searching when on Search Page By Pressing Enter key
NavInput.addEventListener("keydown",e=>{
    if(e.key === "Enter"){
        if(NavInput.value.trim() !== ''){
        NavBarSearch =  NavInput.value.toLowerCase().trim().replace(/\s+/g,'');
        localStorage.setItem("searchKeyword",NavBarSearch);
        window.location.href = "search.html";
    }else
        alert("Input Field Is Empty")
    }
})


