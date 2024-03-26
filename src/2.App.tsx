import {
  useState,
  memo,
  useMemo,
  useCallback
} from "react";

const Child = memo(function (props: any) {
  console.log("Child执行了");
  return (
    <div>
      <h1>{ props.childData.count2 }</h1>
      <button onClick={ props.setCount2Callback }>++</button>
    </div>
  );
});

function App () {

  const [ count1, setCount1 ] = useState(0);
  const [ count2, setCount2 ] = useState(0);

  // const childData = {
  //   count2
  // };

  // 1、可以使用 useMemo 来对依赖进行手动收集，并对组件缓存进行优化
  // 只有在依赖发生变化的时候才会调用回调函数，生成新的对象
  const childData = useMemo(() => ({ count2 }), [count2]);

  // 2、类似于 Vue3 的计算属性，不过React需要手动收集依赖
  const doubleCount1 = useMemo(() => count1 * 2, [count1]);

  const setCount2Callback = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  return (
    <div>
      <h1>{ count1 }</h1>
      <h1>{ doubleCount1 }</h1>
      <button onClick={ () => setCount1(count1 + 1) }>+</button>
      <Child childData={ childData } setCount2Callback={ setCount2Callback }/>
      <button onClick={ () => setCount2(count2 + 1) }>+</button>
    </div>
  );
}

export default App;