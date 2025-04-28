import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux'
import thunk from "redux-thunk";
import reducers from "../reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  debug: true,
  storage,
  whitelist: ['user'],
}
const persistedReducer = persistReducer(persistConfig, reducers)

let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)
export type AppState = ReturnType<typeof reducers>;

export { history, store };
