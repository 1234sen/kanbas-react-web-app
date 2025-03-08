import React from "react";

interface PassingFunctionsProps {
    theFunction: () => void;
}

export default function PassingFunctions({ theFunction }: PassingFunctionsProps) {
    return (
        <div>
            <h2>Passing Functions</h2>
            <button
                onClick={theFunction}
                className="btn btn-primary">
                Invoke the Function
            </button>
            <hr />
        </div>
    );
} 