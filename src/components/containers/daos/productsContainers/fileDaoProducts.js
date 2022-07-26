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
      let products = data.filter((product) => product.category == category);
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
      let products = data.filter(
        (product) => product.subcategory == subcategory
      );
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
}
