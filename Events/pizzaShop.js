const EventEmitter = require("events");
class PizzaShop extends EventEmitter {
  constructor() {
    super(); // called the parent class cnstructor
    this.orderNumber = 0;
  }

  order(size, toppings) {
    this.orderNumber++;
    this.emit("order", size, toppings);
  }

  displayOrder() {
    console.log(`current order number ${this.orderNumber}`);
  }
}

module.exports = PizzaShop;
