import { company_type, intern } from '@/type/interface'
import React from 'react'

interface Props {
    interns: intern[]
}

const SummaryCard = ({interns}: Props) => {
  return (
    <div>
        {interns.map((intern, index) => (
        <div className="flex" key={index}>
          <div>{intern.date}</div>
          <div>{intern.time}</div>
          <div>{intern.title}</div>
          <div>{intern.place}</div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCard