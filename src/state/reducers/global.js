import { CHANGE_YEAR, DRIVER } from "../actions/constant";

const initialState = {
  year: 1950,
  driver: null,
};

function global(state = initialState, action) {
  switch (action.type) {
    case CHANGE_YEAR:
      return {
        ...state,
        year: action.payload.year,
      };
    case DRIVER:
      return {
        ...state,
        driver: action.payload.driver,
      };
    default:
      return state;
  }
}

export default global;
