'use client'
import DateFormat from '@/components/Conversion/DateFormat'
import TimeFormat from '@/components/Conversion/TimeFormat'
import { intern } from '@/type/interface'
import { deletePlan, updatePlan } from '@/lib/companyService'
import { useState } from 'react'

interface Props {
  interns: intern[]
  companyId: string
}

const SummaryCard = ({ interns, companyId }: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<intern>({
    date: '', time: '', title: '', place: ''
  })

  const handleEditStart = (intern: intern, index: number) => {
    setEditingIndex(index)
    // date: "20260615" → "2026-06-15" に変換してinputに渡す
    const d = String(intern.date)
    const dateForInput = `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`
    const t = String(intern.time).padStart(4, '0')
    const timeForInput = `${t.slice(0, 2)}:${t.slice(2, 4)}`
    setEditValues({
      ...intern,
      date: dateForInput,
      time: timeForInput,
    })
  }

  const handleEditSave = async (oldPlan: intern) => {
    try {
      const newPlan: intern = {
        date: editValues.date.replace(/-/g, ''),
        time: editValues.time.replace(':', ''),
        title: editValues.title,
        place: editValues.place,
      }
      await updatePlan(companyId, oldPlan, newPlan)
      setEditingIndex(null)
    } catch (e) {
      console.error(e)
      alert("更新に失敗しました")
    }
  }

  const handleDelete = async (plan: intern) => {
    if (!confirm(`「${plan.title}」を削除しますか？`)) return
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
        <div key={index} style={{ marginBottom: '12px' }}>
          {editingIndex === index ? (
            // 編集モード
            <div>
              <input
                type="date"
                value={editValues.date}
                onChange={(e) => setEditValues({ ...editValues, date: e.target.value })}
              />
              <input
                type="time"
                value={editValues.time}
                onChange={(e) => setEditValues({ ...editValues, time: e.target.value })}
              />
              <input
                type="text"
                value={editValues.title}
                onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
              />
              <input
                type="text"
                value={editValues.place}
                onChange={(e) => setEditValues({ ...editValues, place: e.target.value })}
              />
              <button onClick={() => handleEditSave(intern)}>保存</button>
              <button onClick={() => setEditingIndex(null)}>キャンセル</button>
            </div>
          ) : (
            // 表示モード
            <div>
              <div>
                <DateFormat value={String(intern.date)} />
                <TimeFormat value={String(intern.time).padStart(4, '0')} />
              </div>
              <div>{intern.title} {intern.place}</div>
              <button onClick={() => handleEditStart(intern, index)}>編集</button>
              <button onClick={() => handleDelete(intern)}>削除</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SummaryCard