import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "~/utils/tailwind";

type TypeObject = { type: number; label: string };

const refreshIntervals: TypeObject[] = [
  { type: 1000, label: "1 Second" },
  { type: 2000, label: "2 Seconds" },
  { type: 5000, label: "5 Seconds" },
  { type: 10000, label: "10 Seconds" },
  { type: 20000, label: "20 Seconds" },
];

interface RefreshIntervalListProps {
  onChange: (value: number) => void;
  interval?: number;
}

const RefreshIntervalList: React.FC<RefreshIntervalListProps> = (props) => {
  const { onChange, interval } = props;

  const [selected, setSelected] = useState<TypeObject | undefined>(
    !!interval
      ? {
          type: interval,
          label: refreshIntervals.find((t) => t.type === interval)?.label ?? "",
        }
      : refreshIntervals[0]
  );

  const handleSelect = (value: TypeObject) => {
    setSelected(value);
    onChange(value.type);
  };

  return (
    <Listbox value={selected} onChange={handleSelect}>
      {({ open }) => (
        <div className="flex flex-col items-center">
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Refresh Interval
          </Listbox.Label>
          <div className="relative pb-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected?.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {refreshIntervals.map((currentInterval) => (
                  <Listbox.Option
                    key={currentInterval.type}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-sky-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={currentInterval}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {currentInterval.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-sky-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
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
        </div>
      )}
    </Listbox>
  );
};

export default RefreshIntervalList;
