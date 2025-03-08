import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";

const initialState = {
    modules: db.modules,
    module: { name: "New Module" }
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        
        setModules: (state, action) => {
            state.modules = action.payload;
        },
        addModule: (state, action) => {
            state.modules.push({
                ...action.payload,
                _id: new Date().getTime().toString()
            });
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(
                module => module._id !== action.payload
            );
        },
        updateModule: (state, action) => {
            state.modules = state.modules.map(module => {
                if (module._id === action.payload._id) {
                    return action.payload;
                }
                return module;
            });
        },
        setModule: (state, action) => {
            state.module = action.payload;
        },
editModule: (state, action) => {
    state.modules = state.modules.map(module => {
        if (module._id === action.payload._id) {
            return {
                ...module,
                ...action.payload
            };
        }
        return module;
    });
}
    }
});

export const { setModules,editModule, addModule, deleteModule, updateModule, setModule } = modulesSlice.actions;
export default modulesSlice.reducer; 