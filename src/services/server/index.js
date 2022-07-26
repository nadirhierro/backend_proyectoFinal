import express from "express";
import { createServer } from "http";
import { initSocket } from "../sockets/index.js";
import cors from "cors";
import { config, db } from "../../config/index.js";
import router from "../../routes/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import Logger from "../../utils/logger/index.js";

const app = express();
const httpServer = createServer(app);

let logger = Logger.getInstance();

const PORT = config.port;
const HOST = config.host;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cors(`${config.cors}`));

// Motor de plantilla - ejs
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Cookies y Session con passport
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: db.mongo_atlas,
      mongoOptions: db.advancedOptions,
      autoRemove: "native",
      crypto: {
        secret: db.crypto,
      },
    }),
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    secret: config.sessionSecret,
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger.logRequests);
// Router
app.use("/", router);

// Response para rutas no definidas
app.use("*", (req, res, next) => {
  res.json({
    error: `ruta ${req.params[0]} y método ${req.method} no implementada`,
  });
});

// Inicio Socket
initSocket(httpServer);

export { httpServer, PORT, HOST };
