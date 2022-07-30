import apiProducts from "../../../services/products/index.js";

let service = apiProducts.getInstance();

export default class ProductsViewController {
  constructor() {}

  async showProducts(req, res, next) {
    try {
      let user = await req.user;
      let products = await service.getProducts();
      let category = req.params.category;
      res.render("pages/home/products", {
        name: user.name,
        email: user.email,
        thumbnail: user.avatar,
        products: products,
        category: category,
      });
    } catch (err) {
      res.render("pages/error", { message: err });
    }
  }

  async showProductsByCategory(req, res, next) {
    try {
      let user = await req.user;
      let category = req.params.category;
      let products = await service.getProductsByCategory(category);
      res.render("pages/home/products", {
        name: user.name,
        email: user.email,
        thumbnail: user.avatar,
        products: products,
        category: category,
      });
    } catch (err) {
      res.render("pages/error", { message: err });
    }
  }

  async showProduct(req, res, next) {
    try {
      let user = await req.user;
      let id = req.params.id;
      let product = await service.getProductById(id);
      res.render("pages/home/product", {
        name: user.name,
        email: user.email,
        thumbnail: user.avatar,
        product: product,
      });
    } catch (err) {
      console.log(err);
      res.render("pages/error", { message: err });
    }
  }
}
