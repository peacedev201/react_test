import { CHANGE_YEAR, DRIVER } from "./constant";

export const changeYear = (payload) => ({
  type: CHANGE_YEAR,
  payload,
});

export const selectDriver = (payload) => ({
  type: DRIVER,
  payload,
});
