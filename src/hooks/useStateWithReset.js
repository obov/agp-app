import { useState } from "react";

const useStateWithReset = (initValue) => {
  const [state, setState] = useState(initValue);
  const resetState = setState(initValue);

  return { state, setState, resetState };
};

export default useStateWithReset;
