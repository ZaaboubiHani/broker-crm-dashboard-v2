import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from './current-user.slice';

export const store = configureStore({
    reducer: {
        counter: currentUserReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;