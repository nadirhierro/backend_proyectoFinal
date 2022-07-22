import dotenv from "dotenv";
import _yargs from "yargs";
dotenv.config({ silent: true });

// Yargs
const yargs = _yargs(process.argv.slice(2));

// Seteo el puerto default y limpio los args
const args = yargs.default({
  container_type: process.env.CONTAINER,
  mode: process.env.MODE,
  port: process.env.PORT,
  host: process.env.HOST,
  admin_mail: process.env.ADMIN_MAIL,
  admin_phone: process.env.ADMIN_PHONE,
}).argv;
delete args["_"];
delete args["$0"];

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: args.port,
  host: args.host,
  mode: args.mode,
  cors: process.env.CORS,
  container_type: args.container_type,
  sessionSecret: process.env.SESSION_SECRET,
};

let db = {
  mongo_atlas: process.env.MONGO_ATLAS,
  crypto: process.env.MONGO_ENCRYPT,
  advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};

let cryptoConfig = {
  alogrithm: process.env.CRYPTO_ALGORITHM,
  secretkey: process.env.CRYPTO_SECRET,
};

let mail = {
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  user: process.env.MAILER_USER,
  pass: process.env.MAILER_PASS,
  adminMail: args.adminMail,
};

let twilioConfig = {
  sid: process.env.TWILIO_SID,
  token: process.env.TWILIO_TOKEN,
  adminPhone: args.admin_phone,
};

export { db, config, cryptoConfig, mail, twilioConfig };
