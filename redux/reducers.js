import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import session from "redux-persist/lib/storage/session";
// import session from "redux-persist/lib/storage";
// import reducer
import auth from "./auth";
import recipe from "./recipe";

const persistConfig = {
  key: "root",
  storage: session,
  whitelist: ["auth","recipe"],
};

const rootReducer = combineReducers({
  auth,recipe
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;