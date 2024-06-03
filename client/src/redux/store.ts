import { ThunkMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeReducer";
import { appApi } from "./api/appApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import gameSlice from "./slices/gameSlice";
import tokenSlice from "./slices/tokenSlice";
import apiResponseSlice from "./slices/apiResponseSlice";

const reducers = combineReducers({
  themeReducer: themeReducer,
  appApi: appApi.reducer,
  gameReducer: gameSlice,
  tokenReducer: tokenSlice,
  apiResponseReducer: apiResponseSlice
});
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const customMiddleware = appApi.middleware as ThunkMiddleware;
    return getDefaultMiddleware().concat(customMiddleware);
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
