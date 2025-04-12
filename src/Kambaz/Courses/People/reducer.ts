import { createSlice } from "@reduxjs/toolkit";

interface Person {
    _id: string;
    enrollmentId: string;
    firstName: string;
    lastName: string;
    username: string;
    email?: string;
    role: string;
    enrollmentDate: string;
    [key: string]: any;
}

interface PeopleState {
    people: Person[];
    loading: boolean;
    error: null | string;
}

const initialState: PeopleState = {
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
            const index = state.people.findIndex((p) => p.enrollmentId === action.payload.enrollmentId);
            if (index !== -1) {
                state.people[index] = { ...state.people[index], ...action.payload };
            }
        },
        removePerson: (state, action) => {
            state.people = state.people.filter((p) => p.enrollmentId !== action.payload);
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