import { joinClasses } from "@/lib/helpers";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date | null) => void;
  id: string;
  label?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  id,
  label,
}) => {
  const formattedValue = value ? format(value, "MM/dd/yyyy") : undefined;

  const calendarRef = React.useRef<ReactDatePicker>(null);
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    calendarRef.current?.setOpen(!open);
  };

  const customInput = () => (
    <div className="flex justify-center flex-col gap-1 min-h-[60px] text-zinc-300">
      <div
        onClick={toggleOpen}
        id="datepicker-input-wrapper"
        className={joinClasses(
          "flex items-center p-2 bg-zinc-900 border rounded border-zinc-600 focus:ring-emerald-900 focus:border-zinc-500 ",
          open ? "ring ring-emerald-900 border-zinc-500" : ""
        )}
      >
        <span className="material-symbols-outlined text-xl text-secondary-500">
          calendar_today
        </span>
        <input
          id={id}
          type="text"
          value={formattedValue}
          placeholder={"Select Date"}
          className={
            "no-calendar caret-transparent bg-transparent leading-4 placeholder:text-secondary-500 text-secondary-900 w-full border-none p-0 ml-2 focus:outline-none focus:border-none focus:ring-transparent"
          }
          readOnly
        />
        <span className="material-symbols-outlined font-medium text-xl text-secondary-500">
          {open ? "expand_less" : "expand_more"}
        </span>
      </div>
    </div>
  );

  return (
    <ReactDatePicker
      selected={value}
      onChange={onChange}
      value={formattedValue}
      onCalendarClose={() => setOpen(false)}
      onCalendarOpen={() => setOpen(true)}
      customInput={customInput()}
      className="border-zinc-100 rounded focus:border-zinc-600 focus:outline-none focus:ring-emerald-900"
      filterDate={(date) => date.getDay() === 0}
    />
  );
};
