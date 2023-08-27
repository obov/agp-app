import { useEffect } from "react";

/**
 * userDatas키에 월별 고객데이터 저장
 * ex) users = {
 *    23.08 : [ user1, user2 ]
 *    23.09 : [ user1, user2 ]
 * }
 */
const useUserStorage = ({ users }) => {
  const stringified = JSON.stringify(users);

  useEffect(() => {
    // storing input name
    localStorage.setItem("users", stringified);
  }, [stringified]);

  return null;
};

export default useUserStorage;
