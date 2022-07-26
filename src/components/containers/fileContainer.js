import * as fs from "node:fs";
import moment from "moment";
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
      throw err;
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
      throw err;
    }
  }

  async save(obj) {
    try {
      let data = await this.getAll();
      let id = 1;
      if (data.length > 0) {
        let ids = data.map((item) => item.id);
        id = Math.max.apply(null, ids) + 1;
      }
      let newObject = {
        id: id,
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      data.push(newObject);
      await this.write(data);
      return newObject;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
    }
  }

  async change(obj) {
    try {
      let data = await this.getAll();
      let objInData = data.find((element) => element.id == obj.id);
      if (objInData) {
        let newObject = {
          ...obj,
          timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        };
        data.splice(data.indexOf(objInData), 1, newObject);
        await this.write(data);
        return newObject;
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
      let data = await this.getAll();
      let element = data.find((obj) => obj.id == id);
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
      let data = await this.getAll();
      if (data.find((item) => item.id == id)) {
        let newData = data.filter((data) => data.id != id);
        await this.write(newData);
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
      await this.write([]);
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
    }
  }
}
