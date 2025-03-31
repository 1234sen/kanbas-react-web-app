import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    people: [],
    loading: false,
    error: null
};

const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {
        setPeople: (state, action) => {
            state.people = action.payload;
            state.loading = false;
            state.error = null;
        },
        addPerson: (state, action) => {
            state.people.push(action.payload);
        },
        updatePerson: (state, action) => {
            const index = state.people.findIndex((p: any) => p.enrollmentId === action.payload.enrollmentId);
            if (index !== -1) {
                state.people[index] = { ...state.people[index], ...action.payload };
            }
        },
        removePerson: (state, action) => {
            state.people = state.people.filter((p: any) => p.enrollmentId !== action.payload);
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
    setPeople,
    addPerson,
    updatePerson,
    removePerson,
    setLoading,
    setError
} = peopleSlice.actions;

export default peopleSlice.reducer; 