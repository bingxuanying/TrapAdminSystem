import { EventEmitter } from "events";

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

  getAll() {
    return this.newProducts;
  }
}

const newProductStore = new NewProductStore();

export default newProductStore;
