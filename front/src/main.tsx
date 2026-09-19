import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import "./index.css";

import store from "store/store.ts";
import CalendarApp from "./CalendarApp";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CalendarApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
