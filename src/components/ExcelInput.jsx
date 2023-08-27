import { utils, writeFile, readFile } from "xlsx";
import useUserStorage from "../hooks/useUserStorage";
import { readXlsx } from "../funcs/xlsxReader";
import { useEffect } from "react";

const ExcelInput = () => {
  const [users, setUsers] = useUserStorage();

  const handleChangeXlsxFile = async (e) => {
    const xlsx = await readXlsx(e.target.files[0]);
    setUsers(xlsx);
  };

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  return (
    <input
      id="readExcel"
      type="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      onChange={handleChangeXlsxFile}
    ></input>
  );
};

export default ExcelInput;
