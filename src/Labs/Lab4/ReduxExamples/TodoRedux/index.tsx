import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, setTodo } from "./reducer";
import { Button, FormControl } from "react-bootstrap";

export default function TodoRedux() {
    const { todos, todo } = useSelector((state: any) => state.todoReducer);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        dispatch(addTodo(todo.title));
    };

    return (
        <div>
            <h3>Todo Redux</h3>
            <ul className="list-group">
                {todos.map((todo: any) => (
                    <li key={todo.id}
                        className="list-group-item d-flex justify-content-between align-items-center">
                        {todo.title}
                        <Button
                            onClick={() => dispatch(deleteTodo(todo.id))}
                            className="btn btn-danger btn-sm">
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
            <div className="mt-2">
                <FormControl
                    value={todo.title}
                    onChange={(e) => dispatch(setTodo(e.target.value))}
                    className="mb-2"
                />
                <Button
                    onClick={handleAddTodo}
                    className="btn btn-success">
                    Add Todo
                </Button>
            </div>
            <hr />
        </div>
    );
} 