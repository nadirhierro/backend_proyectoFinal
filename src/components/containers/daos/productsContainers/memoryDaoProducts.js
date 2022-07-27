import memoryContainer from "../../memoryContainer.js";

let instance = null;

export default class memoryDaoProducts extends memoryContainer {
  constructor() {
    super();
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new memoryDaoProducts();
    }
    return instance;
  }

  getByCategory(category) {
    try {
      let products = this.container.filter(
        (product) => product.category == category
      );
      if (products) {
        return products;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  getBySubcategory(subcategory) {
    try {
      let products = this.container.filter(
        (product) => product.subcategory == subcategory
      );
      if (products) {
        return products;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
