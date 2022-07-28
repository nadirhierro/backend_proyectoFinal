import apiCarts from "../../../services/carts/index.js";

let service = apiCarts.getInstance();

export default class CartViewController {
  constructor() {}

  async getCart(req, res, next) {
    try {
      let user = await req.user;
      let cart = await service.getCartByEmail(user.email);
      console.log(cart);
      res.render("cart", { products: cart.products });
    } catch (err) {
      res.render("error", { erorr: err });
    }
  }
}
