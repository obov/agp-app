import useUserStorage from "../hooks/useUserStorage";
import { readXlsx } from "../funcs/xlsxReader";
import { useEffect } from "react";

const ExcelInput = ({ setUserDataForTable }) => {
  const { setUsers, addSubscriber } = useUserStorage();

  const handleChangeXlsxFile = async (e) => {
    const xlsx = await readXlsx(e.target.files[0]);
    setUsers(xlsx);
  };

  useEffect(() => {
    addSubscriber((users) => {
      setUserDataForTable(users);
    });
  }, [addSubscriber, setUserDataForTable]);

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
