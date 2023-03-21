import { useState } from "react";

export default function useCounter(init){
    const [counter, setCounter] = useState(init);

    function increment(){
        return setCounter(counter + 1);
    }
    function decrement(){
        return setCounter(counter - 1);
    }
    function reset(){
        return setCounter(init);
    }

    return [counter, increment, decrement, reset]
}