const EventEmitter = require("events");
const PizzaShop = require("./pizzaShop");
const DrinkMachine = require("./drinkMachine");

function main() {
  // eventUsingEventEmitter();
  removeEventListener();
  console.log(
    "=================================================================="
  );

  // eventUsingCustomClass();
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
    .on("custom_event3", function (data) {
      console.log("Received data : ", data);
    })
    .once("custom", () => {
      console.log("handler get called once");
    });

  //emitting the events
  events.emit("custom_event1");
  // emitting the events with some data
  events.emit("custom_event2");
  events.emit("custom_event3", "arg2");
  events.emit("custom");
  // console.dir(events, { depth: null });
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

function removeEventListener() {
  const events = new EventEmitter();

  //emitter options
  const emitterOptions = {
    dataLimit: 6,
    dataCount: 0,
  };

  // handler
  function handler() {
    console.log("a data event has occurred");
    emitterOptions.dataCount++;
  }

  //listener
  events.on("data", handler);

  events.on("remove", () => {
    events.removeListener("data", handler);
  });

  //emit every second

  setInterval(() => {
    events.emit("data");
    if (emitterOptions.dataCount === emitterOptions.dataLimit) {
      events.emit("remove");
    }
    console.log(emitterOptions, { colors: true });
  }, 1000);

  // //settimeout does not guarantee ,it will run in exactly after 4s
  // setTimeout(() => {
  //   events.removeListener("data", handler);
  // }, 4000);
}
