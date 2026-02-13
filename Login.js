let username = {};
let usernameInput = document.querySelector("#usernameInput");
usernameInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        addingUserName();
    }
})
function addingUserName(){
    if(usernameInput.value.length > 0){
username.name = usernameInput.value; //Adding info in username obj
username.time = Date.now();
localStorage.setItem("username",JSON.stringify(username));
window.history.back(); //Took ypu back to the page you have come
    }
else{
    alert("Username cannot be empty");
}
}