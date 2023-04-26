import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.scss";

import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";

import { Provider } from "react-redux";
// persistor giup luu tru 1 bien redux khong khac gi 1 localstorage
import reduxStore, { persistor } from "./redux";

const renderApp = () => {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <App persistor={persistor} />{" "}
      </IntlProviderWrapper>{" "}
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// axios giup gui dc request toi server nodejs
// file dau tien khi dung cap lenh npm start
