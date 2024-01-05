import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { UpdateUserContextProvider } from "./context/UpdateUserContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51MsVL5FC5YM2xOXYE3uMFl3IoxCrZegwlQXlgsdwtc4mOburkOdKwUhV9MgouCpjrwIQJ2ywDTASZf4kxn8Bvodw00MsKamAwc"
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <UpdateUserContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UpdateUserContextProvider>
    </Elements>
  </React.StrictMode>
);
