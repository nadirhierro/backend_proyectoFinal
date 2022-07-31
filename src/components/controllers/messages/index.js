import apiMessages from "../../services/messages/index.js";

let service = new apiMessages();

export default class MessagesController {
  constructor() {}

  async getMessages(req, res, next) {
    try {
      let messages = await service.getMessages();
      res.status(200).json(messages);
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
    }
  }

  async getMessagesByEmail(req, res, next) {
    try {
      let email = req.params.email;
      let messages = await service.getMessagesByEmail(email);
      res.status(200).json(messages);
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
    }
  }

  async userMessage(req, res, next) {
    try {
      let user = await req.user;
      let email = user.email;
      let type = "user";
      let message = req.body.message;
      let saved = await service.saveMessage({
        email: email,
        type: type,
        message: message,
      });
      res.status(200).json(saved);
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
    }
  }

  async adminMessage(req, res, next) {
    try {
      let type = "system";
      let data = req.body;
      let saved = await service.saveMessage({
        email: data.email,
        type: type,
        message: data.message,
      });
      res.status(200).json(saved);
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
    }
  }
}
