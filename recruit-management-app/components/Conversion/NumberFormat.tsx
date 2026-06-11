import React from 'react'

interface Props {
  value: number
}

const NumberFormat = ({value}: Props) => {
  const oku = Math.floor(value/100000000);
  const man = Math.floor((value%100000000)/10000);

  console.log(oku, man)

  return (
    <div>{oku}億{man!=0 ? `${man}万`: ''}円</div>
  )
}

export default NumberFormat