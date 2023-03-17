import {Message} from "./messages.class.js";

export class MessageService {
    _messages

    constructor() {
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }

    get messages() {
        return this._messages;
    }

    set messages(messages) {
        this._messages = messages;
    }

    getAll = (element) => {
        this.messages = [];
        let messagesElements = [];
        let headers = new Headers();
        let url = "/api/messages"
        let options = {
            method: "GET",
            headers: headers
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                for (let message of data.messages) {
                    this.addMessage(new Message(message.message, message.date, message.author));
                }
                for (let message of this.messages) {
                    // use the templates to create the message element
                    let messageTemplate = document.querySelector("#messageTemplate");
                    let messageElementClone = document.importNode(messageTemplate.content, true);
                    if (message.author.id !== window.localStorage.getItem("uuid")) {
                        messageElementClone.querySelector("#delete").remove();
                        messageElementClone.querySelector("#modify").remove();
                    } else {
                        messageElementClone.querySelector("#delete").addEventListener("click", (event) => {
                            event.preventDefault();
                            this.deleteMessage(message.id);
                            element.innerHTML = "";
                            this.getAll(element);
                        })

                        messageElementClone.querySelector("#modify").addEventListener("click", (event) => {
                            event.preventDefault();
                            let messageForm = document.querySelector("#messageForm");
                            messageForm.messageId.value = message.id;
                            messageForm.message.value = message.message;
                        })

                        messageElementClone.querySelector("#modify").addEventListener("click", (event) => {
                            event.preventDefault();
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
                    messageElementClone.querySelector("#messsage").innerText = message.message;
                    messageElementClone.querySelector("#username").innerText = message.author.username;
                    messageElementClone.id = message.id;
                    element.appendChild(messageElementClone);
                }
            })
        return messagesElements;
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
                console.log(data);
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
                console.log(data);
            })
            .catch(error => console.log(error));
    }

    updateMessage = (id, message) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let url = "/api/messages/" + id
        let options = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(message)
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));
    }
}