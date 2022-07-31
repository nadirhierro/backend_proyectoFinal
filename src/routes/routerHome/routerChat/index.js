import express from "express";
import ChatController from "../../../components/controllers/chat/index.js";

let { Router } = express;

let controller = new ChatController();

let routerChat = new Router();

let isAdmin = async (req, res, next) => {
  try {
    let user = await req.user;
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).redirect("/chat");
    }
  } catch (err) {
    res.status(401).redirect("/chat");
  }
};

routerChat.get("/", controller.renderChatUser);
routerChat.get("/:email", isAdmin, controller.renderChatAdmin);

export default routerChat;
