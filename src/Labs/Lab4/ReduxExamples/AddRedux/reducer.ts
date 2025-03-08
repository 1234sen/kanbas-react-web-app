import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sum: 0,
    num1: 0,
    num2: 0
};

const addSlice = createSlice({
    name: "add",
    initialState,
    reducers: {
        setNum1: (state, action) => {
            state.num1 = parseInt(action.payload);
            state.sum = state.num1 + state.num2;
        },
        setNum2: (state, action) => {
            state.num2 = parseInt(action.payload);
            state.sum = state.num1 + state.num2;
        }
    }
});

export const { setNum1, setNum2 } = addSlice.actions;
export default addSlice.reducer; 