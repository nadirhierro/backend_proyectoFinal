import moment from "moment";
import Logger from "../../utils/logger/index.js";

export default class mongodbContainer {
  constructor(model) {
    this.model = model;
    this.logger = Logger.getInstance();
  }

  async getAll() {
    try {
      let all = await this.model.find({});
      let allObject = all.map((obj) => {
        let newObj = obj.toObject();
        delete newObj.__v;
        return newObj;
      });
      return allObject;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async save(obj) {
    try {
      let newObj = {
        ...obj,
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      };
      let objModel = new this.model(newObj);
      let saveObj = await objModel.save();
      return saveObj.toObject();
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async change(id, obj) {
    try {
      const res = await this.model.updateOne(
        { _id: id },
        { ...obj, timestamp: moment().format("DD/MM/YYYY HH:MM:SS") }
      );
      if (res.modifiedCount > 0) {
        let newCart = await this.getById(id);
        return newCart;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async getById(id) {
    try {
      let element = await this.model.findById(id);
      if (element) {
        let clean = element.toObject();
        delete clean.__v;
        return clean;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async deleteById(id) {
    try {
      let deletedElement = await this.model.deleteOne({ _id: id });
      if (deletedElement.deletedCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async deleteAll() {
    try {
      let allDeleted = await this.model.deleteMany({});
      if (allDeleted.deleteCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
