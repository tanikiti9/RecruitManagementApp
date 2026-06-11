import React from 'react'

interface Props {
    value: string;
}

const TimeFormat = ({value}: Props) => {
    const h = String(value).slice(0,2)
    const m = String(value).slice(2, 4)
  return (
    <div>{h}：{m}</div>
  )
}

export default TimeFormat