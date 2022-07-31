import * as fs from "node:fs";
import moment from "moment";
import ObjectID from "bson-objectid";
import Logger from "../../utils/logger/index.js";

export default class fileContainer {
  constructor(fileName) {
    this.fileName = fileName;
    this.logger = Logger.getInstance();
  }

  async write(data) {
    try {
      return await fs.promises.writeFile(
        `${this.fileName}`,
        `${JSON.stringify(data, null, 2)}`
      );
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile(`${this.fileName}`, "utf-8");
      if (data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async save(obj) {
    try {
      let data = await this.getAll();
      let id = ObjectID();
      let newObject = {
        _id: id,
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      data.push(newObject);
      await this.write(data);
      return newObject;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }

  async change(id, obj) {
    try {
      let data = await this.getAll();
      let objInData = data.find((element) => element._id == id);
      if (objInData) {
        let newObject = {
          ...objInData,
          timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
          ...obj,
        };
        console.log(newObject);
        data.splice(data.indexOf(objInData), 1, newObject);
        await this.write(data);
        return newObject;
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
      let data = await this.getAll();
      let element = data.find((obj) => obj._id == id);
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

  async deleteById(id) {
    try {
      let data = await this.getAll();
      if (data.find((item) => item._id == id)) {
        let newData = data.filter((data) => data._id != id);
        await this.write(newData);
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
      let deleteAll = await this.write([]);
      return deleteAll;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
