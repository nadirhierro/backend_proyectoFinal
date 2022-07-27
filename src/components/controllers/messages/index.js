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
      res.json({ error: err.message });
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
      res.json({ error: err.message });
    }
  }

  async saveMessage(req, res, next) {
    try {
      let message = req.body;
      let saved = await service.saveMessage(message);
      res.status(200).json(saved);
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
    }
  }
}
