import twilio from "twilio";
import { twilioConfig } from "../config/index.js";
import Logger from "../../utils/logger/index.js";

export default class twilioService {
  constructor() {
    this.sid = twilioConfig.sid;
    this.token = twilioConfig.token;
    this.client = twilio(this.sid, this.token);
    this.logger = Logger.getInstance();
  }

  async sendMessage(body, to) {
    try {
      const message = await client.messages.create({
        body: body,
        from: "whatsapp:+16573009784",
        to: `whatsapp:${to}`,
      });
    } catch (err) {
      this.logger.logServiceError();
    }
  }

  async newOrder(userPhone) {
    try {
      await this.sendMessage("New order", adminPhone);
      await this.sendMessage("New order in process", userPhone);
    } catch (err) {
      this.logger.logServiceError("Twilio", err);
    }
  }
}
