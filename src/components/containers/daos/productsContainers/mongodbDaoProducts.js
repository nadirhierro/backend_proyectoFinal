import mongodbContainer from "../../mongodbContainer.js";
import { productModel } from "../../../../models/mongodb/index.js";

let instance = null;

export default class mongodbDaoProducts extends mongodbContainer {
  constructor(model) {
    super(model);
    this.model = productModel;
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new mongodbDaoProducts();
    }
    return instance;
  }

  async getByCategory(category) {
    try {
      let products = await this.model.find({ category: category });
      if (products) {
        return products;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getBySubcategory(category, subcategory) {
    try {
      let products = await this.model.find({
        category: category,
        subcategory: subcategory,
      });
      if (products) {
        return products;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async takeProduct(id, quantity) {
    try {
      let productToTake = await this.getById(id);
      if (productToTake && productToTake.stock >= quantity) {
        productToTake.stock = productToTake.stock - quantity;
        let takeProduct = await this.change(productToTake);
        return takeProduct;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
