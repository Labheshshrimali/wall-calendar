import { format } from "date-fns";

export default function DayCell({
  day,
  onClick,
  isStart,
  isEnd,
  isInRange,
}: any) {
  let style = "bg-gray-100";

  if (isStart || isEnd) style = "bg-blue-500 text-white";
  else if (isInRange) style = "bg-blue-200";

  return (
    <div
      onClick={onClick}
      className={`p-2 text-center rounded cursor-pointer ${style} hover:bg-blue-100`}
    >
      {format(day, "d")}
    </div>
  );
}