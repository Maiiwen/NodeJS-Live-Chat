import {Log} from "./log.class.js";

export class LogService {
    _logs

    constructor() {
        this.logs = [];
    }

    addLog(log) {
        this._logs.push(log);
    }

    get logs() {
        return this._logs;
    }

    set logs(logs) {
        this._logs = logs;
    }

    getAll = () => {
        this.logs = [];
        let headers = new Headers();
        let url = "/api/logs"
        let options = {
            method: "GET",
            headers: headers
        }
        let logsElement = document.createElement("div");
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                for (let log of data) {
                    this.addLog(new Log(log._id, log.ip, log.date, log.path));
                }
                for (let log of this.logs) {
                    let logElement = document.createElement("div");
                    logElement.innerHTML = log.ip + " " + log.date + " " + log.path;
                    logsElement.appendChild(logElement);
                }
            })
            .catch(error => console.log(error));
        return logsElement;
    }
}