import {
  root
} from "./index";

const states = [];
const stateSetters = [];
const effectDepArr = [];

let stateIndex = 0;
let effectIndex = 0;

function createState (initialState, stateIndex) {
  return states[stateIndex] ? states[stateIndex] : initialState;
}

function createStateSetter (stateIndex) {
  return (newState) => {
    if (typeof newState === "function") {
      states[stateIndex] = newState(states[stateIndex]);
    } else {
      states[stateIndex] = newState;
    }

    render();
  }
}

export function useState (initialState) {
  states[stateIndex] = createState(initialState, stateIndex);

  if (!stateSetters[stateIndex]) {
    stateSetters.push(createStateSetter(stateIndex));
  }

  const _state = states[stateIndex];
  const _setState = stateSetters[stateIndex];

  stateIndex ++;

  return [
    _state,
    _setState
  ];
}

export function useReducer (reducer, initialState) {
  const [ state, stateSetter ] = useState(initialState);

  function dispatch (action) {
    const newState = reducer(state, action);
    stateSetter(newState);
  }

  return [
    state,
    dispatch
  ];
}

export function useEffect(cb, depArr) {
  if (typeof cb !== "function") {
    throw new TypeError("Callback must be a function!");
  }

  if (depArr !== undefined && !Array.isArray(depArr)) {
    throw new TypeError("Dependencies must be an array!");
  }

  const isChanged = effectDepArr[effectIndex]
                    ? depArr.some((dep, index) => dep !== effectDepArr[effectIndex][index]) 
                    : true;
  
  isChanged && cb();

  effectDepArr[effectIndex] = depArr;
  effectIndex ++;
}

async function render () {
  console.log("render函数被调用了");
  const App = (await import("./1.App")).default;
  stateIndex = 0;
  effectIndex = 0;
  root.render(<App />);
}