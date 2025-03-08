import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./reducer";
import { Button } from "react-bootstrap";

export default function CounterRedux() {
    const { count } = useSelector((state: any) => state.counterReducer);
    const dispatch = useDispatch();

    return (
        <div>
            <h3>Counter Redux</h3>
            <h4>Count: {count}</h4>
            <Button
                onClick={() => dispatch(increment())}
                className="btn btn-success me-2">
                Increment
            </Button>
            <Button
                onClick={() => dispatch(decrement())}
                className="btn btn-danger">
                Decrement
            </Button>
            <hr />
        </div>
    );
} 