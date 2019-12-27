import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class CompanyInfoStore extends EventEmitter {
  constructor() {
    super();
    this.companyInfo = {
      name: "xxx",
      username: "default",
      numOfProduct: 0,
      products_id: []
    };
  }

  getInfo() {
    return this.companyInfo;
  }

  changeInfo(name, username, numOfProduct, _productInfo) {
    this.companyInfo = {
      name,
      username,
      numOfProduct,
      _productInfo
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
          action._productInfo
        );
      }
    }
  }
}

const companyInfoStore = new CompanyInfoStore();
dispatcher.register(companyInfoStore.handleActions.bind(companyInfoStore));
window.dispatcher = dispatcher;

export default companyInfoStore;
