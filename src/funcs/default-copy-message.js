import {
  isNullOrUndefined,
  removeDuplication,
  numberWithCommas,
  monthParser,
} from "./utils";

const DEFAULT_USER = {
  번호: 0,
  이름: "",
  입소비: 0,
  촉탁약값: 0,
  약값1: 0,
  약값2: 0,
  도뇨관: 0,
  "L-tube": 0,
  영양제: 0,
  수액: 0,
  케어웰: 0,
  기타: 0,
};

export const defaultCopyMessage = (user, month) => {
  return `아가페요양원입니다 \n${user.이름} 님의 ${monthParser(
    month
  )} 요양원비 입니다.${
    userPrice("\n합계 : ", user) //
  }${
    userPrice("\n입소비 : ", user, "입소비") //
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
  const userWithDefaultValues = setDefault(user);
  const noKeysOrEmpty = isNullOrUndefined(keys) || keys.length === 0;
  if (noKeysOrEmpty) {
    return calculateUserPrice(user, [
      "입소비",
      "촉탁약값",
      "약값1",
      "약값2",
      "도뇨관",
      "L-tube",
      "영양제",
      "수액",
      "케어웰",
      "기타",
    ]);
  }

  const isOneKey = typeof keys === "string";
  if (isOneKey) {
    return userWithDefaultValues[keys];
  }

  const uniqeKeys = removeDuplication(keys);
  return uniqeKeys.reduce((acc, key) => acc + userWithDefaultValues[key], 0);
};

const setDefault = (user) => ({ ...DEFAULT_USER, ...user });

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
