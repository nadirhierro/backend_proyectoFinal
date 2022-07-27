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
      return all;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
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
      return saveObj;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
    }
  }

  async change(obj) {
    try {
      const res = await this.model.updateOne(
        { _id: obj.id },
        { ...obj, timestamp: moment().format("DD/MM/YYYY HH:MM:SS") }
      );
      if (res.matchedCount > 0) {
        return res;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      let element = await this.model.findById(id);
      if (element) {
        return element;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
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
      throw err;
    }
  }

  async deleteAll() {
    try {
      let allDeleted = await this.model.deleteMany({});
      return allDeleted;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
    }
  }
}
