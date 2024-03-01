import React, { useState, useEffect } from 'react';
import DayPicker from '../day-picker/day-picker.component';
import MonthDropdown from '../month-dropdown/month-dropdown.component';
import YearDropdown from '../year-dropdown/year-dropdown.component';


interface DatePickerProps {
  onPick: (date: Date) => void;
  initialDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({ onPick, initialDate }) => {
  const [date, setDate] = useState(new Date(initialDate || new Date()) );
  const [rebuildDayTrigger, setRebuildDayTrigger] = useState(false);

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
    }
  }, [initialDate]);

  const handleDaySelect = (daydate: Date) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), daydate.getDate());
    setDate(newDate);
    onPick(newDate);
    setRebuildDayTrigger(!rebuildDayTrigger);
  };

  const handleMonthSelect = (value: number) => {
    const selectedMonth = new Date(date.getFullYear(), value - 1, date.getDate());
    setDate(selectedMonth);
    setRebuildDayTrigger(!rebuildDayTrigger);
    onPick(selectedMonth);
  };

  const handleYearSelect = (value: number) => {
    const selectedYear = new Date(value, date.getMonth(), date.getDate());
    setDate(selectedYear);
    setRebuildDayTrigger(!rebuildDayTrigger);
    onPick(selectedYear);
  };

  return (
    <div style={{ height: '75px' }}>
      <div style={{ height: '75px', display: 'flex', alignItems: 'stretch', flexGrow: '1',  overflowY:'hidden',}}>
        <DayPicker onSelect={(date) => {
          handleDaySelect(date);
        }} initialDate={date}></DayPicker>
        <MonthDropdown onChange={(month) => {
          handleMonthSelect(month);
        }} style={{ margin: '0px 2px', height: 75, }}></MonthDropdown>
        <YearDropdown style={{ margin: '0px 0px 0px 2px', height: 75, }} initalYear={date.getFullYear()} onChange={(year) => {
          handleYearSelect(year);
        }}></YearDropdown>

      </div>
    </div>
  );
};

export default DatePicker;
