import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class NewProductStore extends EventEmitter {
  constructor() {
    super();
    this.newProducts = [
      {
        id: "Prodcut ID",
        company: "Company (Optional: fill NA instead)"
      },
      {
        id: "Prodcut ID",
        company: "Company (Optional: fill NA instead)"
      }
    ];
  }

  createNew() {
    this.newProducts.push({
      id: "Prodcut ID",
      company: "Company (Optional: fill NA instead)"
    });

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
