import { configureStore } from "@reduxjs/toolkit";
import linkReducer from "./features/link/linkSlice";
import statisticsReducer from "./features/statistics/statisticsSlice";
import sportReducer from "./features/sport/sportSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      link: linkReducer,
      statistics: statisticsReducer,
      sport: sportReducer,
    },
    devTools: true,
  });
};