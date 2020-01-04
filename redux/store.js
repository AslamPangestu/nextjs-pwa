import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./index";

const makeStore = (initialState, options) => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default makeStore;
