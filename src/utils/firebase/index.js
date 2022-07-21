import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const json = require("../../config/firebase/keys.json");

let serviceAccount = json;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-d74da.firebaseio.com",
});

const db = admin.firestore();

export default db;
