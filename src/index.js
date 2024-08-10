import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { ToastProvider } from "react-toast-notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//extra api key sudhanshu AIzaSyD53f8EOZksI3yzYqusT85aaAFX5Gleec0
