import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "./reducer";
import { FormControl } from "react-bootstrap";

export default function HelloRedux() {
    const { message } = useSelector((state: any) => state.helloReducer);
    const dispatch = useDispatch();

    return (
        <div>
            <h3>Hello Redux</h3>
            <h4>{message}</h4>
            <FormControl
                value={message}
                onChange={(e) => dispatch(setMessage(e.target.value))}
                className="mb-2"
            />
            <hr />
        </div>
    );
} 