const EventEmitter = require("events");
const PizzaShop = require("./pizzaShop");
const DrinkMachine = require("./drinkMachine");

function main() {
  // eventUsingEventEmitter();
  eventUsingCustomClass();
}

main();

function eventUsingEventEmitter() {
  const events = new EventEmitter();

  //subscribe to the event first
  // before emitting the data.
  events
    .addListener("custom_event1", function () {
      console.log("custom event 1 called");
    })
    .on("custom_event2", () => {
      console.log("custom event 2 called");
    })
    //will get called only once
    .once("custom_event3", function (data) {
      console.log("Received data : ", data);
      console.log(this);
    });

  //emitting the events
  events.emit("custom_event1");
  //emiting the events with some data
  events.emit("custom_event3", "arg1");
  events.emit("custom_event3", "arg2");

  console.dir(EventEmitter, { depth: null });
}

function eventUsingCustomClass() {
  const pizzaShop = new PizzaShop();
  const drinkMachine = new DrinkMachine();

  pizzaShop.on("order", function (size, toppings) {
    console.log(`Order Received : Baking a ${size} pizza with ${toppings}`);
    drinkMachine.serveDrink(size);
  });
  pizzaShop.order("small", "onion");
  pizzaShop.order("large", "onion");
  pizzaShop.order("small", "onion");

  pizzaShop.displayOrder();
}
