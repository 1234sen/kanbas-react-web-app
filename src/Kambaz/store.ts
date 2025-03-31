import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/Modules/reducer";
import enrollmentReducer from "../reducers/enrollmentReducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import peopleReducer from "./Courses/People/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
    coursesReducer,
    modulesReducer,
    enrollmentReducer,
    assignmentsReducer,
    peopleReducer
  }
});

export default store;