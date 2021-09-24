import { CHANGE_YEAR } from "../actions/constant";

const initialState = {
  year: null,
};

function global(state = initialState, action) {
  switch (action.type) {
    case CHANGE_YEAR:
      return {
        ...state,
        year: action.payload.year,
      };
    default:
      return state;
  }
}

export default global;
