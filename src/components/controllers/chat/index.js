export default class ChatController {
  constructor() {}

  async renderChatUser(req, res, next) {
    try {
      let user = await req.user;
      res.status(200).render("chatUser", {
        email: user.email,
        name: user.name,
        thumbnail: user.thumbnail,
      });
    } catch (err) {
      res.status(500).render({ error: err });
    }
  }

  async renderChatAdmin(req, res, next) {
    try {
      let user = await req.user;
      res.status(200).render("chatAdmin", {
        email: user.email,
        name: user.name,
        thumbnail: user.thumbnail,
      });
    } catch (err) {
      res.status(500).render({ error: err });
    }
  }
}
