export default class ChatController {
  constructor() {}

  async renderChatUser(req, res, next) {
    try {
      let user = await req.user;
      res.status(200).render("pages/home/chatUser", {
        email: user.email,
        name: user.name,
        thumbnail: user.avatar,
      });
    } catch (err) {
      res.status(500).render("pages/error", { message: err });
    }
  }

  async renderChatAdmin(req, res, next) {
    try {
      let user = await req.user;
      res.status(200).render("pages/home/chatAdmin", {
        email: user.email,
        name: user.name,
        thumbnail: user.avatar,
      });
    } catch (err) {
      res.status(500).render("pages/error", { message: err });
    }
  }
}
