import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Kambaz/Database";

const initialState = {
    showAllCourses: false,
    enrollments: db.enrollments,
};

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
        toggleShowAllCourses: (state) => {
            state.showAllCourses = !state.showAllCourses;
        },
        enrollInCourse: (state, action) => {
            const newEnrollment = {
                _id: Date.now().toString(), //add only ID
                user: action.payload.userId,
                course: action.payload.courseId,
            };
            state.enrollments.push(newEnrollment);
            localStorage.setItem('enrollments', JSON.stringify(state.enrollments));
        },
        unenrollFromCourse: (state, action) => {
            state.enrollments = state.enrollments.filter(
                e => !(e.user === action.payload.userId && e.course === action.payload.courseId)
            );
            localStorage.setItem('enrollments', JSON.stringify(state.enrollments));
        },
    },
});

export const { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer; 