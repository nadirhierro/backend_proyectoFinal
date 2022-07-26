import { createTransport } from "nodemailer";
import { mail } from "../../config/index.js";
import Logger from "../../utils/logger/index.js";
export default class mailService {
  constructor() {
    this.transporter = createTransport({
      host: mail.host,
      port: mail.port,
      auth: {
        user: mail.user,
        pass: mail.pass,
      },
    });
    this.logger = Logger.getInstance();
  }

  async newUser(user) {
    try {
      const mailOptions = {
        from: "Sincopado",
        to: mail.adminMail,
        subject: "Nuevo Usuario!",
        html: `
        <h2>Nuevo usuario</h2>
        <p>Email: ${user.email}</p>
        <p>Nombre: ${user.name}</p>
        `,
      };
      const info = await this.transporter.sendMail(mailOptions);
    } catch (err) {
      this.logger.logServiceError("Mailer", err);
    }
  }

  async newOrder(user, products) {
    try {
      const mailOptions = {
        from: "Sincopado",
        to: user.email,
        subject: "Nueva orden",
        html: `
          <h2>Nueva orden</h2>
          <p>Email: ${user.email}</p>
          <p>Nombre: ${user.name}</p>
          <ul>
          ${products.map((product) => `<li>${product.name}</li>`)}</ul>
          `,
      };
      const info = await this.transporter.sendMail(mailOptions);
    } catch (err) {
      this.logger.logServiceError();
    }
  }

  async newOrderToAdmin(user, products) {
    try {
      const mailOptions = {
        from: "Sincopado",
        to: "nadir.hierro@gmail.com",
        subject: "Nueva orden",
        html: `
          <h2>Nueva orden</h2>
          <p>Email: ${user.email}</p>
          <p>Nombre: ${user.name}</p>
          <ul>
          ${products.map((product) => `<li>${product.name}</li>`)}</ul>
          `,
      };
      const info = await this.transporter.sendMail(mailOptions);
    } catch (err) {
      this.logger.logServiceError("Mailer", err);
    }
  }
}
