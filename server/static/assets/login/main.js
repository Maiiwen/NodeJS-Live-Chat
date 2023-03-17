import {uuidv4} from "../global/uuidv4.js";

const usernameInput = document.querySelector("#username");
const submitButton = document.querySelector("#submit");
const modal = document.querySelector("#modal");

submitButton.addEventListener("click", () => {
//     get the username from the input field
    let username = usernameInput.value;
//     create a uuid
    let uuid = uuidv4();
//     store the username and uuid in the local storage
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("uuid", uuid);
    // display the modal that says "you have been logged in"
    let modalBs = new bootstrap.Modal(modal);
    modalBs.show();
    // redirect to the messages page
    setTimeout(() => {
        window.location = "/";
    }, 2000);


});