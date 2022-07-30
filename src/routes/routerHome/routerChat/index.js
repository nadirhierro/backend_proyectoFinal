import express from "express";
import ChatController from "../../../components/controllers/chat/index.js";

let { Router } = express;

let controller = new ChatController();

let routerChat = new Router();

routerChat.get("/", controller.renderChatUser);
routerChat.get("/:email", controller.renderChatAdmin);

export default routerChat;
