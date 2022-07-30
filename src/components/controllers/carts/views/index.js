import apiCarts from "../../../services/carts/index.js";

let service = apiCarts.getInstance();

export default class CartViewController {
  constructor() {}

  async getCart(req, res, next) {
    try {
      let user = await req.user;
      let cart = await service.getCartByEmail(user.email);
      console.log(cart.products);
      res.render("pages/home/cart", {
        name: user.name,
        email: user.email,
        thumbnail: user.avatar,
        cartId: cart._id,
        products: cart.products,
      });
    } catch (err) {
      res.render("pages/error", { message: err });
    }
  }
}
