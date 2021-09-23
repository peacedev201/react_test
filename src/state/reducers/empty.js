import { EMPTY } from "../actions/empty";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPTY: {
      return initialState;
    }
    default:
      return state;
  }
};
