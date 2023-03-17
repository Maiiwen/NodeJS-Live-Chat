import {MessageService} from "./messages.service.js";
import {Author} from "./author.class.js";

if (window.localStorage.getItem("username") === null || window.localStorage.getItem("uuid") === null) {
    window.location.href = "/login";
}

const username = window.localStorage.getItem("username");
const uuid = window.localStorage.getItem("uuid");
const author = new Author(uuid, username);
const messageForm = document.querySelector("#messageForm");

const messageFeed = document.querySelector("#messageFeed");
const messageService = new MessageService();

messageService.getAll(messageFeed);

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageForm.messageId.value !== "") {

    }
    let message = messageForm.querySelector("#message").value;
    let messageObject = {
        message: message,
        date: new Date(),
        author: author
    }
    messageService.postMessage(messageObject);
    messageForm.querySelector("#message").value = "";
    messageFeed.innerHTML = "";
    messageService.getAll(messageFeed);
})


