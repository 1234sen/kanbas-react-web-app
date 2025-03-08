import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNum1, setNum2 } from "./reducer";
import { FormControl } from "react-bootstrap";

export default function AddRedux() {
    const { sum, num1, num2 } = useSelector((state: any) => state.addReducer);
    const dispatch = useDispatch();

    return (
        <div>
            <h3>Add Redux</h3>
            <h4>{num1} + {num2} = {sum}</h4>
            <FormControl
                type="number"
                value={num1}
                onChange={(e) => dispatch(setNum1(e.target.value))}
                className="mb-2"
            />
            <FormControl
                type="number"
                value={num2}
                onChange={(e) => dispatch(setNum2(e.target.value))}
                className="mb-2"
            />
            <hr />
        </div>
    );
} 