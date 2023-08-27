import { utils, readFile } from "xlsx";
import { objectMap } from "./utils";
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

const readXlsx = (file) => {
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

export { readXlsx };
