import { useEffect, useMemo, useState } from "react";

const usersExistsBefore = localStorage.getItem("users");

const userSubscribers = new Set();

/**
 * userDatas키에 월별 고객데이터 저장
 * ex) users = {
 *    23.08 : [ user1, user2 ]
 *    23.09 : [ user1, user2 ]
 * }
 */
const useUserStorage = () => {
  const [usersFromSetter, setUsersFromSetter] = useState(
    usersExistsBefore ? usersExistsBefore : ""
  );

  const addSubscriber = (subscriber) => {
    subscriber(users);
    userSubscribers.add(subscriber);
  };

  const setUsers = (users) =>
    typeof users === "string"
      ? setUsersFromSetter(users)
      : // string 이 아닌 경우 적절한 구조를 가져야함
        setUsersFromSetter(JSON.stringify(users));

  const users = useMemo(() => JSON.parse(usersFromSetter), [usersFromSetter]);

  useEffect(() => {
    !usersFromSetter || localStorage.setItem("users", usersFromSetter);
  }, [usersFromSetter]);

  useEffect(() => {
    userSubscribers.forEach((subscriber) => {
      subscriber(users);
    });
    return () => userSubscribers.clear();
  }, [users]);

  return { users, setUsers, addSubscriber };
};

export default useUserStorage;
