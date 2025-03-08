import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
    courses: db.courses,
    course: { name: "New Course", number: "NEW123" }
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        addCourse: (state, action) => {
            state.courses.push({
                ...action.payload,
                _id: new Date().getTime().toString()
            });
        },
        deleteCourse: (state, action) => {
            state.courses = state.courses.filter(
                course => course._id !== action.payload
            );
        },
        updateCourse: (state, action) => {
            state.courses = state.courses.map(course => {
                if (course._id === action.payload._id) {
                    return action.payload;
                }
                return course;
            });
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        }
    }
});

export const { setCourses, addCourse, deleteCourse, updateCourse, setCourse } = coursesSlice.actions;
export default coursesSlice.reducer; 