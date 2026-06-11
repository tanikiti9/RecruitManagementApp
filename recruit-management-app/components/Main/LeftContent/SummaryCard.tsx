import DateFormat from '@/components/Conversion/DateFormat'
import TimeFormat from '@/components/Conversion/TimeFormat'
import { company_type, intern } from '@/type/interface'
import React from 'react'

interface Props {
  interns: intern[]
}

const SummaryCard = ({ interns }: Props) => {
  return (
    <div>
      {interns.map((intern, index) => (
        <div key={index}>
          <div><DateFormat value={intern.date} /> <TimeFormat value={intern.time}/></div>
          <div>{intern.title} {intern.place}</div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCard