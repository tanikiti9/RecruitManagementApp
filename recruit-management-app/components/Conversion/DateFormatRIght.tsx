import React from "react";
interface Props {
  value: String;
}

const DateFormatRight = ({ value }: Props) => {
  const year = String(value).slice(0, 4);
  const month = String(value).slice(4, 6);
  const day = String(value).slice(6, 8);
  return (
    <div>
      {year}/{month}/{day}
    </div>
  );
};

export default DateFormatRight;
