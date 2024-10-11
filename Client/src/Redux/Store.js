import { createStore } from "redux";

const initialValue = {
  isAuth: false,
  user: null,
};

function appReducer(prevState = initialValue, action) {
  console.log("is appReducer executed??", action);

  switch (action.type) {
    case "login":
      console.log("response.data.data", action.payload);

      return {
        ...prevState,
        isAuth: true,
        user: action.payload,
      };

    case "imageUpdate":
      return { ...prevState, isAuth: true, user: action.payload };

    case "logout":
      return {
        ...prevState,
        isAuth: false,
      };

    default:
      return prevState;
  }
}

const store = createStore(appReducer);

export default store;
