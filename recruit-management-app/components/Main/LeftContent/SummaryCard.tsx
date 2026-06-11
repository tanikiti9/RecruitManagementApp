'use client'
import DateFormat from '@/components/Conversion/DateFormat'
import TimeFormat from '@/components/Conversion/TimeFormat'
import { intern } from '@/type/interface'
import { deletePlan } from '@/lib/companyService'

interface Props {
  interns: intern[]
  companyId: string
}

const SummaryCard = ({ interns, companyId }: Props) => {
  const handleDelete = async (plan: intern) => {
    if (!confirm(`「${plan.title}」を削除しますか？`)) return
    console.log("削除対象のplan:", plan)
    console.log("date の型:", typeof plan.date, plan.date)
    console.log("time の型:", typeof plan.time, plan.time)

    try {
      await deletePlan(companyId, plan)
    } catch (e) {
      console.error(e)
      alert("削除に失敗しました")
    }
  }

  return (
    <div>
      {interns.map((intern, index) => (
        <div key={index}>
          <div>
            <DateFormat value={intern.date} />
            <TimeFormat value={intern.time} />
          </div>
          <div>{intern.title} {intern.place}</div>
          <button onClick={() => handleDelete(intern)}>削除</button>
        </div>
      ))}
    </div>
  )
}

export default SummaryCard