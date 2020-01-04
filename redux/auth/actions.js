import { SET_DATA } from "./types";

const setData = ({ data }) => ({
  type: SET_DATA,
  payload: data
});

export default {
  setData
};
