import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class NewProductStore extends EventEmitter {
  constructor() {
    super();
    this.newProducts = [
      {
        num: 0,
        id: "product_0",
        company: "company_0"
      }
    ];
  }

  createNew() {
    let _num = this.newProducts[this.newProducts.length - 1].num + 1;
    this.newProducts.push({
      num: _num,
      id: "product_" + _num.toString(10),
      company: "company_" + _num.toString(10)
    });
    console.log(this.newProducts[this.newProducts.length - 1]);
    this.emit("change");
  }

  getAll() {
    return this.newProducts;
  }

  handleActions(action) {
    switch (action.type) {
      case "CREAT_NEW": {
        this.createNew();
      }
    }
  }
}

const newProductStore = new NewProductStore();
dispatcher.register(newProductStore.handleActions.bind(newProductStore));

export default newProductStore;
