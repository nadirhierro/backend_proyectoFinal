import apiMessages from "../../services/messages/index.js";

let service = new apiMessages();

export default class MessagesController {
  constructor() {}

  async getMessages(req, res, next) {
    try {
      let messages = await service.getMessages();
      res.json(messages);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async getMessagesByEmail(req, res, next) {
    try {
      let { email } = req.params;
      let messages = await service.getMessagesByEmail(email);
      res.json(messages);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async saveMessage(req, res, next) {
    try {
      let message = req.body;
      let saved = await service.saveMessage(message);
      res.json(saved);
    } catch (err) {
      res.json({ error: err });
    }
  }
}
