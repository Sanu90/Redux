import { createStore } from "redux";
// import { persistStore, persistReducer } from "redux-persist";

// const initialValue = {
//   isAuth: false,
//   user: null,
// };

const initialValue = {
  isAuth: false,
  user: {
    userName: null,
    email: null,
    mobile: null,
    bloodGroup: null,
    Date: null,
  },
};

function appReducer(prevState = initialValue, action) {
  console.log("STORE - Reducer");

  console.log("is appReducer executed??", action.type);

  switch (action.type) {
    case "userLogin":
      console.log("STORE - user logged in");
      console.log("response.data.data", action.payload);

      return {
        ...prevState,
        isAuth: true,
        user: { ...prevState.user, ...action.payload },
      };

    case "imageUpdate":
      console.log("STORE - image update appReducer");
      console.log(action.payload, "imageUpdate case in store");

      return {
        ...prevState,
        isAuth: true,
        user: { ...prevState.user, ...action.payload },
      };

    case "profileUpdate":
      console.log("STORE - profile update appReducer");
      return {
        ...prevState,
        isAuth: true,
        user: { ...prevState.user, image: action.payload },
      };

    case "userLogout":
      console.log("STORE - user logged out");
      return {
        ...prevState,
        isAuth: false,
        user: initialValue.user,
      };

    default:
      return prevState;
  }
}

const store = createStore(appReducer);

export default store;
