import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enrollments: [],
    loading: false,
    error: null
};

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
            state.loading = false;
            state.error = null;
        },
        addEnrollment: (state, action) => {
            state.enrollments.push(action.payload);
        },
        removeEnrollment: (state, action) => {
            const { userId, courseId } = action.payload;
            state.enrollments = state.enrollments.filter(
                (enrollment: any) => !(enrollment.user === userId && enrollment.course === courseId)
            );
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    setEnrollments,
    addEnrollment,
    removeEnrollment,
    setLoading,
    setError
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer; 