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
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-6">企業情報の登録</h1>

      <input
        type="text"
        placeholder="企業名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="資本金"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="代表取締役"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="その他情報"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <p className="font-bold mb-1">スケール：{scale}</p>
      <div className="flex gap-2 mb-4">
        {(["大", "中", "小"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setScale(v)}
            className={`px-4 py-2 rounded border ${
              scale === v ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <p className="font-bold mb-1">優先度：{priority}</p>
      <div className="flex gap-2 mb-8">
        {(["大", "中", "小"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setPriority(v)}
            className={`px-4 py-2 rounded border ${
              priority === v ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <button
        onClick={handleSend}
        className="bg-blue-500 text-white w-full py-3 rounded text-lg font-bold"
      >
        企業を登録する
      </button>
    </div>
  )
}

export default AddInfo