'use client'
import { auth, db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AddInfo = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [capital, setCapital] = useState("")
  const [director, setDirector] = useState("")
  const [summary, setSummary] = useState("")
  const [scale, setScale] = useState<"大" | "中" | "小" | "">("")
  const [priority, setPriority] = useState<"大" | "中" | "小" | "">("")

  const handleSend = async () => {
    if (!name || !capital || !director || !scale || !priority) {
      alert("すべての項目を入力してください")
      return
    }

    const uid = auth.currentUser?.uid
    if (!uid) {
      alert("ログインが必要です")
      return
    }

    try {
      await addDoc(collection(db, "users", uid, "companies"), {
        name,
        capital: Number(capital),
        director,
        summary,
        scale,
        priority,
        plan: [],
        createdAt: serverTimestamp(),
      })
      alert("登録しました！")
      router.push("/")
    } catch (e) {
      console.error(e)
      alert("登録に失敗しました")
    }
  }

  return (
    <div>
      <h1>企業情報の登録</h1>

      <input
        type="text"
        placeholder="企業名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="資本金"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
      />
      <input
        type="text"
        placeholder="代表取締役"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <input
        type="text"
        placeholder="その他情報"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <p>スケール：{scale}</p>
      <div>
        {(["大", "中", "小"] as const).map((v) => (
          <button key={v} onClick={() => setScale(v)}>
            {v}
          </button>
        ))}
      </div>

      <p>優先度：{priority}</p>
      <div>
        {(["大", "中", "小"] as const).map((v) => (
          <button key={v} onClick={() => setPriority(v)}>
            {v}
          </button>
        ))}
      </div>

      <button onClick={handleSend}>
        企業を登録する
      </button>
    </div>
  )
}

export default AddInfo