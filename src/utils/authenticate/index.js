let instance = null;

export default class apiAuthenticator {
  constructor() {}

  static getInstance() {
    if (!instance) {
      instance = new apiAuthenticator();
    }
    return instance;
  }
  async isAdmin(req, res, next) {
    let user = await req.user;
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "FORBIDDEN" });
    }
  }

  isUser(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized, please login" });
    }
  }
}
