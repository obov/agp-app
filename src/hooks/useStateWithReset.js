import { useCallback, useEffect, useState } from "react";

const useStateWithReset = (initValue) => {
  const [state, setState] = useState(initValue);
  const resetState = useCallback(
    () => setState(initValue),
    [setState, initValue]
  );
  const useReactiveReset = (...dependencies) =>
    useEffect(() => resetState(), [...dependencies]);

  return { state, setState, resetState, useReactiveReset };
};

export default useStateWithReset;
