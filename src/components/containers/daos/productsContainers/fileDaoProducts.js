import fileContainer from "../../fileContainer.js";

let instance = null;

export default class fileDaoProducts extends fileContainer {
  constructor() {
    super();
    this.fileName = "./data/products.json";
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new fileDaoProducts();
    }
    return instance;
  }

  async getByCategory(category) {
    try {
      let data = await this.getAll();
      let products = data.find((product) => product.category == category);
      if (products) {
        return products;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
    }
  }

  async getBySubcategory(subcategory) {
    try {
      let data = await this.getAll();
      let products = data.find((product) => product.subcategory == subcategory);
      if (products) {
        return products;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
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
      this.logger.logDatabaseError(err);
      throw err;
    }
  }
}
