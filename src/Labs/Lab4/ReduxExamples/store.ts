import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./HelloRedux/reducer";
import counterReducer from "./CounterRedux/reducer";
import addReducer from "./AddRedux/reducer";
import todoReducer from "./TodoRedux/reducer";

const store = configureStore({
    reducer: {
        helloReducer,
        counterReducer,
        addReducer,
        todoReducer
    }
});

export default store; 