import fileDaoCarts from "./cartsContainers/fileDaoCarts.js";
import memoryDaoCarts from "./cartsContainers/memoryDaoCarts.js";
import mongodbDaoCarts from "./cartsContainers/mongodbDaoCarts.js";
import fileDaoMessages from "./messagesContainers/fileDaoMessages.js";
import memoryDaoMessages from "./messagesContainers/memoryDaoMessages.js";
import mongodbDaoMessages from "./messagesContainers/mongodbDaoMessages.js";
import fileDaoOrders from "./ordersContainers/fileDaoOrders.js";
import memoryDaoOrders from "./ordersContainers/memoryDaoOrders.js";
import mongodbDaoOrders from "./ordersContainers/mongodbDaoOrders.js";
import fileDaoProducts from "./productsContainers/fileDaoProducts.js";
import memoryDaoProducts from "./productsContainers/memoryDaoProducts.js";
import mongodbDaoProducts from "./productsContainers/mongodbDaoProducts.js";
import fileDaoUsers from "./usersContainers/fileDaoUsers.js";
import memoryDaoUsers from "./usersContainers/memoryDaoUsers.js";
import mongodbDaoUsers from "./usersContainers/mongodbDaoUsers.js";
import { config } from "../../../config/index.js";

// Container type desde config-args
let container_type = config.container_type;

export default class daoFactory {
  createCartsDaoDB() {
    if (container_type == "file") return fileDaoCarts.getInstance();
    if (container_type == "memory") return memoryDaoCarts.getInstance();
    if (container_type == "mongodb") return mongodbDaoCarts.getInstance();
  }

  createMessagesDaoDB() {
    if (container_type == "file") return fileDaoMessages.getInstance();
    if (container_type == "memory") return memoryDaoMessages.getInstance();
    if (container_type == "mongodb") return mongodbDaoMessages.getInstance();
  }

  createOrdersDaoDB() {
    if (container_type == "file") return fileDaoOrders.getInstance();
    if (container_type == "memory") return memoryDaoOrders.getInstance();
    if (container_type == "mongodb") return mongodbDaoOrders.getInstance();
  }

  createProductsDaoDB() {
    if (container_type == "file") return fileDaoProducts.getInstance();
    if (container_type == "memory") return memoryDaoProducts.getInstance();
    if (container_type == "mongodb") return mongodbDaoProducts.getInstance();
  }

  createUsersDaoDB() {
    if (container_type == "file") return fileDaoUsers.getInstance();
    if (container_type == "memory") return memoryDaoUsers.getInstance();
    if (container_type == "mongodb") return mongodbDaoUsers.getInstance();
  }
}
