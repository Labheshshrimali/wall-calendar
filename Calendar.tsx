"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";
import DayCell from "./DayCell";
import Notes from "./Notes";

export default function Calendar() {
  const [currentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const handleClick = (day: Date) => {
    if (!startDate) {
      setStartDate(day);
    } else if (!endDate) {
      if (isAfter(day, startDate)) {
        setEndDate(day);
      } else {
        setStartDate(day);
      }
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const isInRange = (day: Date) => {
    if (startDate && endDate) {
      return isAfter(day, startDate) && isBefore(day, endDate);
    }
    return false;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-4xl flex flex-col md:flex-row gap-4">
      
      <div
        className="w-full md:w-1/3 h-48 md:h-auto rounded bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/600x800/?nature')",
        }}
      />

      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-3">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <div className="grid grid-cols-7 gap-2 text-sm">
          {days.map((day) => (
            <DayCell
              key={day.toString()}
              day={day}
              onClick={() => handleClick(day)}
              isStart={startDate && isSameDay(day, startDate)}
              isEnd={endDate && isSameDay(day, endDate)}
              isInRange={isInRange(day)}
            />
          ))}
        </div>

        <Notes />
      </div>
    </div>
  );
}