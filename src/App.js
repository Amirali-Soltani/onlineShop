import React from "react";
import "./css/app.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import configureStore from "./redux-slicers/configureStore";
import Main__page from "./components/main__page";
import Last_category from "./components/last_category";
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react"

import Product from "./components/product";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Not__found from "./components/not__found";
import shoppingProcess from "./components/shoppingProcess";
import Category from "./components/category";

const store = configureStore();
let persistor = persistStore(store)

function App() {

  return(
    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
  <div>
    <Router>
<Switch>
<Route path="/" exact component={Main__page} />
          <Route path="/last__category/:id/:filters?" component={Last_category} />
          <Route path="/product/:id/"  component={Product} />
          <Route path="/page-404" exact component={Not__found} />
          <Route path="/shoppingProcess" exact component={shoppingProcess} />
          <Route path="/category/:id" exact component={Category} />


        <Redirect to="/page-404" />
        </Switch>


    </Router>
  <ToastContainer rtl={false}/>

  </div>
  </PersistGate>
  </Provider>

  );
}

export default App;
