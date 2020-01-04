import { SET_DATA } from "./types";

// type State = {
//   username: string,
//   password: string
// };

// const initialState: State = {
//   username: "",
//   password: ""
// };

const initialState = {
  username: "",
  password: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};
