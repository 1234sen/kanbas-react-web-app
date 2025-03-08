import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);

    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };

    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <Button
                onClick={addElement}
                className="btn btn-success mb-2">
                Add Element
            </Button>
            <ul className="list-group">
                {array.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {item}
                        <Button
                            onClick={() => deleteElement(index)}
                            className="btn btn-danger btn-sm">
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
} 