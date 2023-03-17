import {LogService} from "./log.service.js";

const root = document.querySelector("#root");
const logService = new LogService();

root.appendChild(logService.getAll())



