import express from "express";
import MessagesController from "../../../components/controllers/messages/index.js";

let { Router } = express;

let routerMessages = new Router();

let messages = new MessagesController();

routerMessages.get("/", messages.getMessages);
routerMessages.get("/:email", messages.getMessagesByEmail);
routerMessages.post("/users", messages.userMessage);
routerMessages.post("/admins", messages.adminMessage);

export default routerMessages;
