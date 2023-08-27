import { useEffect } from "react";

const useLog = (valueForLog, logMessage = "log", callback = (v) => v) => {
  useEffect(() => {
    console.log(`${logMessage} : `, callback(valueForLog));
  }, [valueForLog, logMessage, callback]);
  return;
};

export default useLog;
