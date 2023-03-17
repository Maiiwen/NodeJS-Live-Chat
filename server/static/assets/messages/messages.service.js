import {Message} from "./messages.class.js";

export class MessageService {
    _messages

    _messageFeedElement

    _socket

    constructor(element, socket) {
        this.messages = [];
        this.messageFeedElement = element;
        this.socket = socket;
    }

    get messageFeedElement() {
        return this._messageFeedElement;
    }

    set messageFeedElement(element) {
        this._messageFeedElement = element;
    }

    get socket() {
        return this._socket;
    }

    set socket(socket) {
        this._socket = socket;
    }

    addMessage(messageObject) {
        // use the templates to create the message element
        let messageTemplate = document.querySelector("#messageTemplate");
        let messageElementClone = document.importNode(messageTemplate.content, true);
        if (messageObject.author.id !== window.localStorage.getItem("uuid")) {
            messageElementClone.querySelector("#delete").remove();
            messageElementClone.querySelector("#modify").remove();
        } else {
            messageElementClone.querySelector("#delete").addEventListener("click", (event) => {
                event.preventDefault();
                this.deleteMessage(messageObject.id);
            })

            messageElementClone.querySelector("#modify").addEventListener("click", (event) => {
                event.preventDefault();
                let messageForm = document.querySelector("#messageForm");
                messageForm.messageId.value = messageObject.id;
                messageForm.message.value = messageObject.message;
            })

            let flexRows = messageElementClone.querySelectorAll(".flex-row")
            flexRows[0].classList.add("flex-row-reverse");
            flexRows[0].classList.remove("flex-row");
            flexRows[1].classList.add("flex-row-reverse");
            flexRows[1].classList.remove("flex-row");

            messageElementClone.querySelector("#side").classList.add("align-items-end");
            messageElementClone.querySelector("#side").classList.remove("align-items-start");
            messageElementClone.querySelector("#messsage").classList.add("text-right");

        }
        messageElementClone.querySelector("#messsage").innerText = messageObject.message;
        messageElementClone.querySelector("#username").innerText = messageObject.author.username;
        messageElementClone.firstElementChild.setAttribute("data-id", messageObject.id);
        this.messageFeedElement.appendChild(messageElementClone);
    //     scroll to bottom
        this.messageFeedElement.scrollTop = this.messageFeedElement.scrollHeight;
    }

    get messages() {
        return this._messages;
    }

    set messages(messages) {
        this._messages = messages;
    }

    getAll = () => {
        this.messages = [];
        let headers = new Headers();
        let url = "/api/messages"
        let options = {
            method: "GET",
            headers: headers
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                for (let message of data) {
                    let messageObject = new Message(message.message, message.date, message.author, message._id);
                    this.addMessage(messageObject);

                }
            })
    }

    postMessage = (message) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let url = "/api/messages"
        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(message)
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                let message = new Message(data.messageAdded.message, data.messageAdded.date, data.messageAdded.author, data.messageAdded._id)
                // send change to websocket
                this.socket.send(JSON.stringify({
                    type: "add",
                    message: message
                }));
                this.addMessage(message)
            })
            .catch(error => console.log(error));
    }

    deleteMessage = (id) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let url = "/api/messages/" + id
        let options = {
            method: "DELETE",
            headers: headers
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                // search and delete the message from DOM
                let messageElement = document.querySelector(`[data-id="${data.deletedMessage}"]`);
                messageElement.remove();
                // send change to websocket
                this.socket.send(JSON.stringify({
                    type: "delete",
                    messageId: data.deletedMessage
                }));

            })
            .catch(error => console.log(error));
    }

    updateMessage = (message) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let url = "/api/messages/" + message.id
        let options = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(message)
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                // search and delete the message from DOM
                let messageElement = document.querySelector(`[data-id="${data.messageUpdated._id}"]`);
                messageElement.remove();
                let updatedMessage = new Message(data.messageUpdated.message, data.messageUpdated.date, data.messageUpdated.author, data.messageUpdated._id);
                this.addMessage(updatedMessage);
                // send change to websocket
                this.socket.send(JSON.stringify({
                    type: "update",
                    message: updatedMessage
                }));

            })
            .catch(error => console.log(error));
    }

    updateLocalMessage = (message) => {
        let messageElement = document.querySelector(`[data-id="${message.id}"]`);
        messageElement.remove();
        this.addMessage(message);
    }

    deleteLocalMessage = (id) => {
        let messageElement = document.querySelector(`[data-id="${id}"]`);
        messageElement.remove();
    }
}