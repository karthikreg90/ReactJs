import React from "react";

const Steps = (props) => {
    
    return (
        <div className="container">
            <button onClick={props.increment}>+</button>
            <div> Steps : {props.count} </div>
            <button onClick={props.decrement}>-</button>
        </div>
    );
}

export default Steps;