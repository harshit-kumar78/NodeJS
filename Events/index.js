const EventEmitter = require("events");
const PizzaShop = require("./pizzaShop");
const DrinkMachine = require("./drinkMachine");

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

function removeAllListener() {
  const events = new EventEmitter();

  events.on("data", () => {
    console.log("data event fired");
  });

  events
    .on("data", (person) => {
      console.log("data event fired " + person);
    })
    .on("message", () => {
      console.log("message event fired");
    });
  //every second emit data events

  setInterval(() => {
    events.emit("data");
    events.emit("message");
  }, (interval = 1000));

  setTimeout(() => {
    // events.removeAllListeners("message");
    events.removeAllListeners();
  }, (timeout = 4000));
}

function maxListeners() {
  const event1 = new EventEmitter();
  const event2 = new EventEmitter();

  // const defaultMax = event.getMaxListeners();
  event1.setMaxListeners(30);
  const defaultMax = event1.getMaxListeners();
  console.log(defaultMax);

  event1
    .on("data", () => {
      console.log("data event fired");
    })
    .addListener("data", (param1) => {
      console.log("data event fired with " + param1);
    })
    .once("message", () => {
      console.log("message event fired once");
    });

  console.log(`
      ${event1.eventNames()} 
      ${event1.listenerCount("data")} 
      ${event1.listeners("data")}`);

  console.log(event1, event2);
}

function main() {
  // eventUsingEventEmitter();
  // removeEventListener();
  // removeAllListener();
  maxListeners();

  // eventUsingCustomClass();
}

main();
