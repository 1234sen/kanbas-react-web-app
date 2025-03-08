import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        { id: "1", title: "Learn React" },
        { id: "2", title: "Learn Redux" }
    ],
    todo: { title: "New Todo" }
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: new Date().getTime().toString(),
                title: action.payload
            });
            state.todo = { title: "" };
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(
                todo => todo.id !== action.payload
            );
        },
        setTodo: (state, action) => {
            state.todo = { title: action.payload };
        }
    }
});

export const { addTodo, deleteTodo, setTodo } = todoSlice.actions;
export default todoSlice.reducer; 