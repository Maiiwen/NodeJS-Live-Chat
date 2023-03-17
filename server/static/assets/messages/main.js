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
const messageService = new MessageService(messageFeed);

messageService.getAll();

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let message = messageForm.message.value;
    if (message === "") {
        return;
    }
    let messageObject = {
        message: message,
        date: new Date(),
        author: {
            id: author.id,
            username: author.username
        }
    }
    if (messageForm.messageId.value !== "") {
        console.log(messageForm.messageId.value)
        messageObject.id = messageForm.messageId.value;
        messageForm.messageId.value = "";
        messageService.updateMessage(messageObject);
    } else {
        messageService.postMessage(messageObject);
    }

    messageForm.message.value = "";
})


// // connect to websocket using uuid
// const socket = new WebSocket("ws://localhost:3001/");
//
// socket.onmessage = (event) => {
//     const message = JSON.parse(event.data);
//     switch (message.type) {
//         case "new":
//             messageService.addMessage(message.data);
//             break;
//         case "update":
//             messageService.updateMessage(message.data);
//             break;
//         case "delete":
//             messageService.deleteMessage(message.data);
//             break;
//         default:
//             console.log("Unknown message type: " + message.type);
//             console.log(message);
//             break;
//     }
// }
