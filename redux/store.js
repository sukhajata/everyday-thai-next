//import AsyncStorage from "@react-native-community/async-storage";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./reducers";


// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2
};


const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = compose(applyMiddleware(...middlewares))(createStore)(persistedReducer);//createStore(persistedReducer);

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

// Exports
export { store, persistor };
