import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class CompanyInfoStore extends EventEmitter {
  constructor() {
    super();
    this.companyInfo = {
      name: "default",
      username: "default",
      numOfProduct: 0,
      productInfo: [-1, -1, -1, -1, -1, -1]
    };
  }

  getInfo() {
    return this.companyInfo;
  }

  changeInfo(name, username, numOfProduct, productInfo) {
    this.companyInfo = {
      name,
      username,
      numOfProduct,
      productInfo
    };

    this.emit("change");
  }

  handleActions(action) {
    switch (action.type) {
      case "SELECT_COMPANY": {
        this.changeInfo(
          action.company,
          action.username,
          action.numOfProduct,
          action.productInfo
        );
      }
    }
  }
}

const companyInfoStore = new CompanyInfoStore();
dispatcher.register(companyInfoStore.handleActions.bind(companyInfoStore));
window.dispatcher = dispatcher;

export default companyInfoStore;
