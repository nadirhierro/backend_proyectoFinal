import passport from "passport";
import LocalStrategy from "passport-local";
import apiUsers from "../../components/services/users/index.js";
import { encrypt, decrypt } from "../encrypt/index.js";

const users = new apiUsers();

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      let user = await users.getUser(username);
      if (!user) return done(null, false);
      if (decrypt(user.password) !== password) return done(null, false);
      return done(null, user);
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        let email = req.body.username;
        let password = encrypt(req.body.password);
        let name = req.body.name;
        let surname = req.body.surname;
        let alias = req.body.alias;
        let address = req.body.address;
        let age = req.body.age;
        let phone = req.body.phone;
        let avatar = req.body.avatar;
        let user = await users.getUserByEmail(email);
        if (user) return done(null, false);
        let newUser = {
          email,
          password,
          name,
          surname,
          alias,
          address,
          age,
          phone,
          avatar,
          isAdmin: false,
        };
        await users.saveUser(newUser);
        return done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

// Serialize y desirialize
passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  let user = users.getUser(email);
  done(null, user);
});

export { passport };
