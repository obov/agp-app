import { utils, readFile } from "xlsx";
export const TABLE_HEADER = ["번호", "이름", "금액"];

const readXlsx = (file) => {
  const filePromise = new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb2 = readFile(bufferArray);
      resolve({
        //test sheet 만 꺼내는 중
        test: utils.sheet_to_json(wb2.Sheets["test"], {
          header: TABLE_HEADER,
          range: "A2:C100",
          raw: false,
          blankrows: false,
          defval: null,
          dateNF: "YYYY-MM-DD",
        }),
      });
    };
  });
  return filePromise;
};

export { readXlsx };
