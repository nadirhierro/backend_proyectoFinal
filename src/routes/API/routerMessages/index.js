import express from "express";
import MessagesController from "../../../components/controllers/messages/index.js";
import apiAuthenticator from "../../../utils/authenticate/index.js";

let { Router } = express;

let authenticator = apiAuthenticator.getInstance();

let routerMessages = new Router();

let messages = new MessagesController();

routerMessages.get("/", messages.getMessages);
routerMessages.get(
  "/:email",
  authenticator.isAdmin,
  messages.getMessagesByEmail
);
routerMessages.post("/users", authenticator.isUser, messages.userMessage);
routerMessages.post("/admins", authenticator.isAdmin, messages.adminMessage);

export default routerMessages;
