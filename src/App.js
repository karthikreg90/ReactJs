import React, { useState, useRef, useReducer } from 'react';
import './App.css';
import Steps from './Steps';
import Timer from './Timer';
import useCounter from './useCounter';
import useScreen from './useScreen';

function App() {
  const [name, setName] = useState("karthik");
  const [flag, setFlag] = useState(true);
  const [count, setCount] = useState(0);
  const [clock, setClock] = useState(true);
  const [user, setUser] = useState("");
  const userEl = useRef("");
  const init = [{
    id: Date.now(),
    name: "karthik",
    email: "karthik.tm@gmail.com"
  }]
  const [stateVal, dispatchData] = useReducer(actionReducers, init);
  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [counter, incrementcounter, decrementcounter, resetcounter] = useCounter(0);
  const screenSize = useScreen();

  function actionReducers(state, action){
      switch(action.type){
        case "add":
          return [...state, action.payload];
        case "delete":
          return state.filter((contact) => {
            return contact.id !== action.payload.id;
          });
        default:
          throw new Error();
      }
  }

  function changeName(){
    setFlag(!flag);
    return setName(flag ? "Shilpa" : "karthik");
  }

  function incrementCount(){
    setCount(count + 1);
  }

  function decrementCount(){
    if(count > 0){
      setCount(count - 1);
    }
    return count;
  }

  function toggleClock(){
    return setClock(!clock);
  }

  function resetInput(e){
    e.preventDefault();
    setUser("");
    userEl.current.focus();
  }

  function addContact(e){
    e.preventDefault();
    if(empName !== ""){
      const contact = {
        id: Date.now(),
        name: empName,
        email: empEmail
      }
      setEmpName("");
      setEmpEmail("");
      dispatchData({type: "add", payload: contact});
    }
  }

  return (
    <div>
      <div className='container'>
        <h2>Hello, {name}</h2>
        <button onClick={changeName} >Change Name</button>
      </div>

      <Steps count={count} increment={incrementCount} decrement={decrementCount} />

      <div className='container'>
        <button onClick={toggleClock} className="mt20">Toggle Clock</button>
        {clock ? <Timer/> : ""}
      </div>

      <div className='container'>
        <form>
          <input ref={userEl} type="text" name='name' value={user} onChange={(e) => { setUser(e.target.value) }} />
          <button onClick={resetInput}>Reset</button>
          User Name: {user}
        </form>
      </div>

      <div className='container'>
        <form onSubmit={addContact}>
          <div>
            <input type="text" placeholder='name' value={empName} onChange={(e) => setEmpName(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder='email' value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} />
          </div>
          <button>Submit</button>
        </form>

        <ul>
          {
            stateVal.map((contact) => {
              return (<li key={contact.id}>
                <h5>
                  {contact.name}
                  {contact.email}
                </h5>
                <button onClick={() => { dispatchData({type: "delete", "payload": {id : contact.id}}) } }>Delete</button>
              </li>);    
            })
          }
          
        </ul>
      </div>
      <div className='container'>
          <h1>Custom Hooks useCounter</h1>
          <h2>{ counter }</h2>
          <button onClick={incrementcounter}>Increment</button>
          <button onClick={decrementcounter}>Decrement</button>
          <button onClick={resetcounter}>Reset</button>
      </div>

      <div className='container'>
          <h1>Custom Hooks useScreen</h1>
          <h2>{ screenSize }</h2>
      </div>
    </div>
  );
}

export default App;
