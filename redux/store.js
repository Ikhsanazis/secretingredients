import { createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";

// export const persistReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(rootReducer);
export const persistor = persistStore(store);