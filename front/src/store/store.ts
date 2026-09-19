import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import calendarsReducer from "./calendars.reducer";
import eventsReducer from "./events.reducer";
import userProfileReducer from "./userProfile.reducer";

let rootReducer = combineReducers({
  calendarsReducer,
  eventsReducer,
  userProfileReducer,
});

const store = configureStore({ reducer: rootReducer });

declare global {
  interface Window {
    store: typeof store;
  }
}

window.store = store;

export type RootState = ReturnType<typeof rootReducer>;

export default store;