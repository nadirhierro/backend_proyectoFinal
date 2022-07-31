import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/assets/avatars");
  },
  filename: function (req, file, cb) {
    let email = req.body.username;
    req.body.avatar = `/assets/avatars/${email}-avatar.jpg`;
    req.body.password = req.body.password[0];
    cb(null, `${email}-avatar.jpg`);
  },
});

const upload = multer({ storage: storage });

export { upload };
