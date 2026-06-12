'use client'
import { company_type } from "@/type/interface"
import NumberFormat from "../Conversion/NumberFormat"
import { updateCompany } from "@/lib/companyService"
import { useState } from "react"

interface Props {
  company: company_type
}

const CompanySummary = ({ company }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({
    name: company.name,
    capital: String(company.capital),
    director: company.director,
    summary: company.summary,
    scale: company.scale,
    priority: company.priority,
  })

  const handleSave = async () => {
    try {
      await updateCompany(company.id as string, {
        name: editValues.name,
        capital: Number(editValues.capital),
        director: editValues.director,
        summary: editValues.summary,
        scale: editValues.scale as company_type['scale'],
        priority: editValues.priority as company_type['priority'],
      })
      setIsEditing(false)
    } catch (e) {
      console.error(e)
      alert("更新に失敗しました")
    }
  }

  if (isEditing) {
    return (
      <div>
        <div>
          <label>企業名</label>
          <input
            type="text"
            value={editValues.name}
            onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
          />
        </div>
        <div>
          <label>資本金</label>
          <input
            type="number"
            value={editValues.capital}
            onChange={(e) => setEditValues({ ...editValues, capital: e.target.value })}
          />
        </div>
        <div>
          <label>代表取締役</label>
          <input
            type="text"
            value={editValues.director}
            onChange={(e) => setEditValues({ ...editValues, director: e.target.value })}
          />
        </div>
        <div>
          <label>その他情報</label>
          <textarea
            value={editValues.summary}
            onChange={(e) => setEditValues({ ...editValues, summary: e.target.value })}
          />
        </div>
        <div>
          <label>スケール：{editValues.scale}</label>
          {(["大", "中", "小"] as const).map((v) => (
            <button key={v} onClick={() => setEditValues({ ...editValues, scale: v })}>
              {v}
            </button>
          ))}
        </div>
        <div>
          <label>優先度：{editValues.priority}</label>
          {(["大", "中", "小"] as const).map((v) => (
            <button key={v} onClick={() => setEditValues({ ...editValues, priority: v })}>
              {v}
            </button>
          ))}
        </div>
        <button onClick={handleSave}>保存</button>
        <button onClick={() => setIsEditing(false)}>キャンセル</button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: "flex" }}>資本金：<NumberFormat value={company.capital} /></div>
      <div>代表取締役：{company.director}</div>
      <div>その他情報<br />{company.summary}</div>
      <div>スケール：{company.scale}</div>
      <div>優先度：{company.priority}</div>
      <button onClick={() => setIsEditing(true)}>編集</button>
    </div>
  )
}

export default CompanySummary