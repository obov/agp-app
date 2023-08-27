import useUserStorage from "../hooks/useUserStorage";
import { readXlsx } from "../funcs/xlsx-utils";
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
    <label className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
      엑셀 업로드
      <input
        id="readExcel"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
        onChange={handleChangeXlsxFile}
      ></input>
    </label>
  );
};

export default ExcelInput;
