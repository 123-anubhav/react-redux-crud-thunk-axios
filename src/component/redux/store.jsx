import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";
import logger from 'redux-logger';
import {thunk} from "redux-thunk";

let middleware = [thunk, logger];
let store = createStore(rootReducer, applyMiddleware(...middleware));
export { store };