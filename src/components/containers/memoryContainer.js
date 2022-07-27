import moment from "moment";
import ObjectID from "bson-objectid";
import Logger from "../../utils/logger/index.js";

export default class memoryContainer {
  constructor() {
    this.container = [];
    this.logger = Logger.getInstance();
  }

  getAll() {
    try {
      return this.container;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  save(obj) {
    try {
      let id = ObjectID();
      let newObject = {
        _id: id,
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      this.container.push(newObject);
      return newObject;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  change(obj) {
    try {
      let objInContainer = this.container.find(
        (element) => element._id == obj._id
      );
      if (objInContainer) {
        let newObject = {
          ...obj,
          timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        };
        this.container.splice(
          this.container.indexOf(objInContainer),
          1,
          newObject
        );
        return newObject;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  getById(id) {
    try {
      let element = this.container.find((obj) => obj._id == id);
      if (element) {
        return element;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  deleteById(id) {
    try {
      let obj = this.getById(id);
      if (obj) {
        this.container.splice(this.container.indexOf(obj), 1);
        return true;
      } else {
        return false;
      }
    } catch (err) {}
  }

  deleteAll() {
    try {
      this.container = [];
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
