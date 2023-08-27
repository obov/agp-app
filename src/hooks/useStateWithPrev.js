import { useState } from "react";

// 필요없는 코드
const useStateWithPrev = (initValue) => {
  const [currentState, setCurrentState] = useState(initValue);
  const [prevState, setPrevState] = useState(null);

  const setState = (value) => {
    setPrevState(currentState);
    setCurrentState(value);
  };

  return { state: currentState, setState, prevState };
};

export default useStateWithPrev;
