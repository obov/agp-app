import { useMemo, useState } from "react";
import ExcelInput from "./components/ExcelInput";
import {
  copyText,
  isNullOrUndefined,
  monthParser,
  nullIfNotExists,
} from "./funcs/utils";
import { TABLE_HEADER } from "./funcs/xlsxReader";
import Modal from "./Modal";
import useStateWithReset from "./hooks/useStateWithReset";
import useLog from "./hooks/useLog";
import { Dialog } from "@headlessui/react";
import defaultCopyMessage from "./funcs/defaultCopyMessage";
import MonthList from "./components/monthList";
import Button from "./components/Button";

export default function App() {
  const [userDataForTable, setUserDataForTable] = useState(null);
  // 비효율적인 렌더링 가능성,,
  // const stigified = JSON.stringify(userDataForTable);
  const monthes = isNullOrUndefined(userDataForTable)
    ? []
    : Object.keys(userDataForTable);
  const [month, setMonth] = useState("test");

  const {
    state: userSelected,
    setState: setUserSelected,
    useReactiveReset: useReactiveResetUserSelected,
  } = useStateWithReset(null);

  const users = useMemo(
    () => (userDataForTable ? userDataForTable[month] : null),
    [month, userDataForTable]
  );

  const [copyContent, setCopyContent] = useState("");

  const handleClickUser = (user) => () => {
    setUserSelected(user);
    setCopyContent(defaultCopyMessage(user, month));
    openModal();
  };

  const handleChangeCopyContent = (e) => {
    setCopyContent(e.target.value);
  };

  const handleSelectMonth = (e) => {
    if (month !== e) {
      setMonth(e);
    }
  };

  const handleClickDownload = () => {
    console.log("download");
  };

  useReactiveResetUserSelected(month);

  useLog(userDataForTable, "userData");
  // useLog(copyContent, "copyContent");
  // useLog(userSelected, "userSelected");
  // useLog(copyContent, "copyContent");

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModalCancel = () => {
    setIsOpen(false);
  };
  const handleCloseModalCopy = () => {
    copyText(copyContent);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="fixed top-16 w-full">
      <div className="mx-2 inline-block">
        <ExcelInput setUserDataForTable={setUserDataForTable} />
      </div>
      <div className="mx-2 inline-block">
        <Button onClick={handleClickDownload} text={"현재 파일 다운로드"} />
      </div>
      <div className="mx-2 inline-block">
        <Button onClick={handleClickDownload} text={"양식 다운로드"} />
      </div>

      <div className="h-4"></div>

      <div className="w-72 pl-4">
        <MonthList monthes={monthes} onSelectMonth={handleSelectMonth} />
      </div>

      <div className="h-4"></div>

      <div className="pl-4">
        <table className="table-auto w-full">
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
                <tr
                  key={user.번호}
                  onClick={handleClickUser(user)}
                  className="hover:bg-slate-100 cursor-pointer"
                >
                  {TABLE_HEADER.map((header) => (
                    <td key={header}>{user[header]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} closeModal={handleCloseModalCancel}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          세부 정보
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {nullIfNotExists(
              userSelected,
              (userSelected) =>
                `${userSelected.이름} 님께 보내기 위한 메시지 입니다.`
            )}
          </p>
        </div>

        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {monthParser(month)}
        </label>
        <textarea
          id="message"
          rows="14"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          value={copyContent}
          onChange={handleChangeCopyContent}
        ></textarea>

        <div className="mt-4">
          <Button onClick={handleCloseModalCopy} text={"복사 / 닫기"} />
        </div>
      </Modal>
    </div>
  );
}
