import React from "react";
import { Button } from "react-bootstrap";

interface ChildStateComponentProps {
    counter: number;
    setCounter: (counter: number) => void;
}

export default function ChildStateComponent({
    counter,
    setCounter
}: ChildStateComponentProps) {
    return (
        <div id="wd-child-state">
            <h3>Counter in Child: {counter}</h3>
            <Button
                onClick={() => setCounter(counter + 1)}
                className="btn btn-success me-2"
                id="wd-increment-child-state-click">
                Increment
            </Button>
            <Button
                onClick={() => setCounter(counter - 1)}
                className="btn btn-danger"
                id="wd-decrement-child-state-click">
                Decrement
            </Button>
        </div>
    );
} 