import { useEffect } from "react";

const useLog = (valueForLog, logMessage = "log") => {
  useEffect(() => {
    console.log(`${logMessage} : `, valueForLog);
  }, [valueForLog, logMessage]);
  return;
};

export default useLog;
