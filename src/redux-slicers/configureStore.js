import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleWare/api";
import cart from "./middleWare/addToCart"
import storage from 'redux-persist/lib/storage' 
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, reducer)

export default function() {
  return configureStore({
    reducer:persistedReducer,
    middleware: [
      ...getDefaultMiddleware(),
      api,
      cart,
    ]
  });
}
