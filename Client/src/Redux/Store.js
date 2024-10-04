import { createStore } from "redux";

const initialValue = {};

function appReducer(prevState = initialValue, action) {
  switch (action.type) {
    case "a":
      return {};

    case "b":
      return {};
  }
}

const store = createStore(appReducer);

export default store;
