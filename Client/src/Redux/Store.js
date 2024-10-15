import { createStore } from "redux";
// import { persistStore, persistReducer } from "redux-persist";

const initialValue = {
  isAuth: false,
  user: null,
};

function appReducer(prevState = initialValue, action) {
  console.log("Reducer");

  console.log("is appReducer executed??", action.type);

  switch (action.type) {
    case "login":
      console.log("response.data.data", action.payload);

      return {
        ...prevState,
        isAuth: true,
        user: action.payload,
      };

    case "imageUpdate":
      console.log("image update appReducer");
      console.log(action.payload, "imageUpdate case in store");

      return { ...prevState, isAuth: true, user: action.payload };

    case "profileUpdate":
      console.log("profile update appReducer");
      return {
        ...prevState,
        isAuth: true,
        user: { ...prevState.user, image: action.payload },
      };

    case "logout":
      console.log("logged out");
      return {
        ...prevState,
        isAuth: false,
        user: null,
      };

    default:
      return prevState;
  }
}

const store = createStore(appReducer);

export default store;
