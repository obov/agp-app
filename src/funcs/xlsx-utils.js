import { utils, readFile, write } from "xlsx";
import { objectMap, saveToArrayBuffer } from "./utils";
import { saveAs } from "file-saver";

export const TABLE_HEADER = [
  "번호",
  "이름",
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
];

export const readXlsx = (file) => {
  const filePromise = new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb2 = readFile(bufferArray);
      const jsonSheets = objectMap(wb2.Sheets, utils.sheet_to_json);
      resolve(jsonSheets);
    };
  });
  return filePromise;
};

export const downLoadXlsx = (userData) => {
  const workBook = utils.book_new();
  Object.entries(userData).forEach(([key, value]) => {
    const workSheet = utils.json_to_sheet(value);
    utils.book_append_sheet(workBook, workSheet, key);
  });

  const workBookData = write(workBook, { bookType: "xlsx", type: "binary" });
  const blob = new Blob([saveToArrayBuffer(workBookData)], {
    type: "application/octet-stream",
  });
  saveAs(blob, "example.xlsx");
};

export const downLoadXlsxExample = () => {
  const jsonData = {
    23.08: [
      {
        번호: 1,
        이름: "가나다",
        입소비: 700000,
        촉탁약값: 50000,
        약값1: 20000,
        약값2: 10000,
        도뇨관: 10000,
        "L-tube": 10000,
        영양제: 10000,
        수액: 10000,
        케어웰: 10000,
        기타: 10000,
      },
    ],
  };

  const workBook = utils.book_new();
  Object.entries(jsonData).forEach(([key, value]) => {
    const workSheet = utils.json_to_sheet(value);
    utils.book_append_sheet(workBook, workSheet, key);
  });

  const workBookData = write(workBook, { bookType: "xlsx", type: "binary" });
  const blob = new Blob([saveToArrayBuffer(workBookData)], {
    type: "application/octet-stream",
  });
  saveAs(blob, "example.xlsx");
};
