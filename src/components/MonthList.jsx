import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { isNullOrUndefined } from "../funcs/utils";
import useLog from "../hooks/useLog";

export default function MonthList({ monthes, onSelectMonth }) {
  const monthesIsArrayAndHasDatas =
    Array.isArray(monthes) && monthes.length > 0;
  const [selected, setSelected] = useState(null);

  const handleChangeSelect = (e) => {
    setSelected(e);
    onSelectMonth(e);
  };

  useEffect(() => {
    const selectedIsNotExists = isNullOrUndefined(selected);
    if (monthesIsArrayAndHasDatas && selectedIsNotExists) {
      const firstValueForSelected = monthes[0];
      setSelected(firstValueForSelected);
      onSelectMonth(firstValueForSelected);
    }
  }, [monthes, monthesIsArrayAndHasDatas, onSelectMonth, selected]);

  useLog(monthes, "monthes");
  useLog(selected, "selected", (selected) => typeof selected);

  return (
    <Listbox value={selected} onChange={handleChangeSelect}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-24 cursor-pointer rounded-lg bg-slate-50 hover:bg-blue-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="flex items-center justify-center truncate h-6">
            {selected ? selected : "ads"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-36 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {monthes.map((month, monthIdx) => (
              <Listbox.Option
                key={monthIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-50 text-blue-900" : "text-gray-900"
                  }`
                }
                value={month}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate cursor-pointer ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {month}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
