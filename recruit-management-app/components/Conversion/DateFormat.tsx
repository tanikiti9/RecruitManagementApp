import React from 'react'
interface Props {
  value: number;
}

const DateFormat = ({ value }: Props) => {
  const year = String(value).slice(0, 4)
  const month = String(value).slice(4, 6)
  const day = String(value).slice(6, 8)
  return (
    <div>{year}年 {month}月 {day}日</div>
  )
}

export default DateFormat