import {MessageService} from "./messages.service.js";
import {Author} from "./author.class.js";
import {Message} from "./messages.class.js";


if (window.localStorage.getItem("username") === null || window.localStorage.getItem("uuid") === null) {
    window.location.href = "/login";
}

const username = window.localStorage.getItem("username");
const uuid = window.localStorage.getItem("uuid");
const author = new Author(uuid, username);
const messageForm = document.querySelector("#messageForm");
// connect to websocket using uuid
const socket = new WebSocket("ws://127.0.0.1:3001/?uuid=" + uuid);

const messageFeed = document.querySelector("#messageFeed");
const messageService = new MessageService(messageFeed, socket);

messageService.getAll();

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let message = messageForm.message.value;
    if (message === "") {
        return;
    }
    let messageObject = new Message(message, new Date(), {
        id: author.id,
        username: author.username
    });
    console.log(messageObject)
    if (messageForm.messageId.value !== "") {
        console.log(messageForm.messageId.value)
        messageObject.id = messageForm.messageId.value;
        messageForm.messageId.value = "";
        messageService.updateMessage(messageObject);
    } else {
        console.log(messageObject)
        messageService.postMessage(messageObject);
    }

    messageForm.message.value = "";
})

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    let message
    switch (data.type) {
        case "add":
            message = new Message(data.message._message, data.message._date, data.message._author, data.message._id);

            messageService.addMessage(message);
            break;
        case "update":
            message = new Message(data.message._message, data.message._date, data.message._author, data.message._id);

            messageService.updateLocalMessage(message);
            break;
        case "delete":
            let messageId = data.messageId;

            messageService.deleteLocalMessage(messageId);
            break;
        default:
            message = new Message(data.message._message, data.message._date, data.message._author, data.message._id);
            console.log("Unknown message type: " + data.type);
            console.log(message);
            break;
    }
}
