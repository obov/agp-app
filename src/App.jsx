import { useMemo, useState } from "react";
import ExcelInput from "./components/ExcelInput";
import { nullIfNotExists } from "./funcs/utils";
import { TABLE_HEADER } from "./funcs/xlsxReader";
import Modal from "./Modal";
import useStateWithReset from "./hooks/useStateWithReset";
import useLog from "./hooks/useLog";
import { Dialog } from "@headlessui/react";

export default function App() {
  const [userDataForTable, setUserDataForTable] = useState(null);
  const [month, setMonth] = useState("test");

  const {
    state: userSelected,
    setState: setUserSelected,
    useReactiveReset,
  } = useStateWithReset(null);

  const users = useMemo(
    () => (userDataForTable ? userDataForTable[month] : null),
    [month, userDataForTable]
  );

  const handleClickUser = (user) => () => {
    setUserSelected(user);
    openModal();
    console.log(user);
  };

  useReactiveReset(month);

  useLog(userDataForTable, "userData");
  useLog(userSelected, "userSelected");

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
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
              <tr key={user.번호} onClick={handleClickUser(user)}>
                <td>{user.번호}</td>
                <td>{user.이름}</td>
                <td>{user.금액}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          세부 정보
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {nullIfNotExists(userSelected, (userSelected) => userSelected.이름)}
          </p>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Got it, thanks!
          </button>
        </div>
      </Modal>
    </div>
  );
}
