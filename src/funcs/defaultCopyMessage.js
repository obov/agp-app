import {
  isNullOrUndefined,
  removeDuplication,
  numberWithCommas,
  monthParser,
} from "./utils";

export const defaultCopyMessage = (user, month) => {
  return `아가페요양원입니다 \n${user.이름} 님의 ${monthParser(
    month
  )} 요양원비 입니다.${
    userPrice("\n합계 : ", user) //
  }${
    userPrice("\n입소비 : ", user, ["입소비"]) //
  }${
    userPrice("\n약값 합계 : ", user, [
      "촉탁약값",
      "약값1",
      "약값2",
      "도뇨관",
      "L-tube",
      "영양제",
      "수액",
      "케어웰",
      "기타",
    ]) //
  }${
    userPrice("\n└촉탁약값 : ", user, "촉탁약값") //
  }${
    userPrice("\n└병원비 : ", user, ["약값1", "약값2"]) //
  }${
    userPrice("\n└L-tube 또는 도뇨관 : ", user, ["L-tube", "도뇨관"]) //
  }${
    userPrice("\n└수액 : ", user, ["수액", "영양제"]) //
  }${
    userPrice("\n└케어웰 : ", user, "케어웰") //
  }${
    userPrice("\n└기타 : ", user, "기타") //
  }`;
};

const calculateUserPrice = (user, keys) => {
  const noKeysOrEmpty = isNullOrUndefined(keys) || keys.length === 0;
  if (noKeysOrEmpty) {
    const totalSum =
      user.입소비 +
      user.촉탁약값 +
      user.약값1 +
      user.약값2 +
      user.도뇨관 +
      user["L-tube"] +
      user.영양제 +
      user.수액 +
      user.케어웰 +
      user.기타;

    return totalSum;
  }

  const isOneKey = typeof keys === "string";
  if (isOneKey) {
    return user[keys];
  }

  const uniqeKeys = removeDuplication(keys);
  return uniqeKeys.reduce((acc, key) => acc + user[key], 0);
};

const addSurfix = (value, surfix) => `${value}${surfix}`;

const addPrefix = (prefix) => (value) => `${prefix}${value}`;

const emptyStringIfZeroOr = (number, orValue) => (number === 0 ? "" : orValue);

const calculateUserPriceWithWon = (user, keys) =>
  addSurfix(numberWithCommas(calculateUserPrice(user, keys)), " 원");

const userPrice = (prefix, user, keys) =>
  emptyStringIfZeroOr(
    calculateUserPrice(user, keys),
    addPrefix(prefix)(calculateUserPriceWithWon(user, keys))
  );

export default defaultCopyMessage;
