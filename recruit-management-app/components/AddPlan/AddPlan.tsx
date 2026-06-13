"use client";

import { auth, db } from "@/lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Company {
  id: string;
  name: string;
}

const AddPlan = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [planTime, setPlanTime] = useState("");
  const [planTitle, setPlanTitle] = useState("");
  const [planPlace, setPlanPlace] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snapshot = await getDocs(collection(db, "users", uid, "companies"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCompanies(list);
      if (list.length > 0) setSelectedId(list[0].id);
    };
    fetch();
  }, []);

  const handleSend = async () => {
    if (!selectedId || !planDate || !planTime || !planTitle || !planPlace) {
      alert("すべての項目を入力してください");
      return;
    }

    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert("ログインが必要です");
      return;
    }

    try {
      const companyRef = doc(db, "users", uid, "companies", selectedId);

      await updateDoc(companyRef, {
        plan: arrayUnion({
          date: Number(planDate.replace(/-/g, "")),
          time: planTime.replace(":", ""),
          title: planTitle,
          place: planPlace,
        }),
      });

      alert("予定を追加しました！");
      router.push("/");
    } catch (e) {
      console.error(e);
      alert("追加に失敗しました");
    }
  };

  return (
    <div>
      <h1>予定の追加</h1>

      <p>企業を選択</p>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {companies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={planDate}
        onChange={(e) => setPlanDate(e.target.value)}
      />
      <input
        type="time"
        value={planTime}
        onChange={(e) => setPlanTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="タイトル（例：一次面接)"
        value={planTitle}
        onChange={(e) => setPlanTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="場所（例：大阪本社)"
        value={planPlace}
        onChange={(e) => setPlanPlace(e.target.value)}
      />

      <button onClick={handleSend}>予定を追加する</button>
    </div>
  );
};

export default AddPlan;
