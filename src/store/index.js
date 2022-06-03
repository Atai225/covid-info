import { configureStore } from "@reduxjs/toolkit";
import covidReducer from "./reducers/covid.reducer";

export const store = configureStore({
	reducer: {
		covid: covidReducer,
	}
})