import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoRedux from "./TodoRedux";

export default function ReduxExamples() {
    return (
        <Provider store={store}>
            <div>
                <h2>Redux Examples</h2>
                <HelloRedux />
                <CounterRedux />
                <AddRedux />
                <TodoRedux />
            </div>
        </Provider>
    );
} 