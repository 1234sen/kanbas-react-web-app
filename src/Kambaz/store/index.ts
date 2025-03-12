import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../Account/reducer";
import coursesReducer from "../Courses/reducer";
import modulesReducer from "../Courses/Modules/reducer";
import enrollmentReducer from "../../reducers/enrollmentReducer";

const store = configureStore({
    reducer: {
        accountReducer,
        coursesReducer,
        modulesReducer,
        enrollmentReducer,
    }
});

export default store; 