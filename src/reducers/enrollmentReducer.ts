import { createSlice } from "@reduxjs/toolkit";

interface Enrollment {
    _id: string;
    user: string;
    course: string;
    role: string;
    enrollmentDate: string;
}

interface EnrollmentState {
    enrollments: Enrollment[];
    loading: boolean;
    error: null | string;
    showAllCourses: boolean;
}

const initialState: EnrollmentState = {
    enrollments: [],
    loading: false,
    error: null,
    showAllCourses: false
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
                (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
            );
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        toggleShowAllCourses: (state) => {
            state.showAllCourses = !state.showAllCourses;
        },
        enrollInCourse: (state, action) => {
            const { userId, courseId } = action.payload;
            const exists = state.enrollments.some(
                (e) => e.user === userId && e.course === courseId
            );
            if (!exists) {
                const newEnrollment: Enrollment = {
                    user: userId,
                    course: courseId,
                    role: "STUDENT",
                    enrollmentDate: new Date().toISOString(),
                    _id: new Date().getTime().toString()
                };
                state.enrollments.push(newEnrollment);
            }
        },
        unenrollFromCourse: (state, action) => {
            const { userId, courseId } = action.payload;
            state.enrollments = state.enrollments.filter(
                (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
            );
        }
    }
});

export const {
    setEnrollments,
    addEnrollment,
    removeEnrollment,
    setLoading,
    setError,
    toggleShowAllCourses,
    enrollInCourse,
    unenrollFromCourse
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer; 