import CompanySchedule from '@/components/CompanySummary/CompanySchedule'
import CompanySummary from '@/components/CompanySummary/CompanySummary'
import React from 'react'

const RightContent = () => {
  return (
    <div>
        <CompanySummary />
        <CompanySchedule />
    </div>
  )
}

export default RightContent