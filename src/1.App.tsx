import React from 'react';
import {
  useState,
  useEffect
} from './React';

function App() {

  const [ count, setCount ] = useState(1);

  function handleClick () {
    return setCount((count: number) => count * 2);
  }

  useEffect(() => {
    console.log("组件初次渲染时调用 Effect");
  }, []);

  useEffect(() => {
    console.log("count 依赖变化时调用 Effect");
  }, [count]);

  return (
    <div className="App">
      <h1>{ count }</h1>
      <button onClick={ handleClick }>ADD</button>
    </div>
  );
}

export default App;
