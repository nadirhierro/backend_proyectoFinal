import mongoose from "../../config/mongodb/index.js";
import productSchema from "./schemas/products.js";
import cartSchema from "./schemas/carts.js";
import orderSchema from "./schemas/orders.js";
import userSchema from "./schemas/users.js";
import messageSchema from "./schemas/messages.js";

const { Schema, model } = mongoose;

let ProductSchema = new Schema(productSchema);
let productModel = new model("products", ProductSchema);

let CartSchema = new Schema(cartSchema);
let cartModel = new model("carts", CartSchema);

let OrderSchema = new Schema(orderSchema);
let orderModel = new model("orders", OrderSchema);

let UserSchema = new Schema(userSchema);
let userModel = new model("users", UserSchema);

let MessageSchema = new Schema(messageSchema);
let messageModel = new model("messages", MessageSchema);

export { productModel, cartModel, orderModel, userModel, messageModel };
