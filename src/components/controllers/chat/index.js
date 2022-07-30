export default class ChatController {
  constructor() {}

  async renderChatUser(req, res, next) {
    try {
      let user = await req.user;
      res.status(200).render("pages/chatUser", {
        email: user.email,
        name: user.name,
        thumbnail: user.thumbnail,
      });
    } catch (err) {
      res.status(500).render("pages/error", { message: err });
    }
  }

  async renderChatAdmin(req, res, next) {
    try {
      let user = await req.user;
      res.status(200).render("pages/chatAdmin", {
        email: user.email,
        name: user.name,
        thumbnail: user.thumbnail,
      });
    } catch (err) {
      res.status(500).render("pages/error", { message: err });
    }
  }
}
