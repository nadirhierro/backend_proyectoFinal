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
      if (products.length > 0) {
        let allObject = products.map((obj) => {
          let newObj = obj.toObject();
          delete newObj.__v;
          return newObj;
        });
        return allObject;
      } else {
        return products;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async getBySubcategory(category, subcategory) {
    try {
      let products = await this.model.find({
        category: category,
        subcategory: subcategory,
      });
      if (products.length > 0) {
        let allObject = products.map((obj) => {
          let newObj = obj.toObject();
          delete newObj.__v;
          return newObj;
        });
        return allObject;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async takeProduct(id) {}
}
