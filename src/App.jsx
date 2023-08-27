import { useEffect, useMemo, useState } from "react";
import ExcelInput from "./components/ExcelInput";
import { nullIfNotExists } from "./funcs/utils";
import { TABLE_HEADER } from "./funcs/xlsxReader";

export default function App() {
  const [userDataForTable, setUserDataForTable] = useState(null);
  const [month, setMonth] = useState("test");
  const users = useMemo(
    () => (userDataForTable ? userDataForTable[month] : null),
    [month, userDataForTable]
  );

  useEffect(() => {
    console.log("userData", userDataForTable);
  }, [userDataForTable]);
  // let [value, setValue] = useState({ value: "" });
  // let [isOpen, setIsOpen] = useState(false);
  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }
  return (
    <div className="fixed top-16 w-72">
      <ExcelInput setUserDataForTable={setUserDataForTable} />
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div> */}

      {/* <Modal isOpen={isOpen} closeModal={closeModal}></Modal> */}
      <table className="table-auto">
        <thead>
          <tr>
            {TABLE_HEADER.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nullIfNotExists(users, (users) =>
            users.map((user) => (
              <tr key={user.번호}>
                <td>{user.번호}</td>
                <td>{user.이름}</td>
                <td>{user.금액}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
