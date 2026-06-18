"use client";

import { auth, db } from "@/lib/firebase";
import { Button, Paper, TextField, Typography } from "@mui/material";
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
  const [planSummary, setPlanSummary] = useState("");

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
          summary: planSummary,
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
    <Paper
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: "90px",
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        予定の追加
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextField
          select
          label="企業"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          fullWidth
          slotProps={{
            select: {
              native: true,
            },
          }}
        >
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </TextField>

        <TextField
          label="日付"
          type="date"
          value={planDate}
          onChange={(e) => setPlanDate(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
        />

        <TextField
          label="時間"
          type="time"
          value={planTime}
          onChange={(e) => setPlanTime(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
        />

        <TextField
          label="タイトル"
          value={planTitle}
          onChange={(e) => setPlanTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label="場所"
          value={planPlace}
          onChange={(e) => setPlanPlace(e.target.value)}
          fullWidth
        />

        <TextField
          label="メモ"
          value={planSummary}
          onChange={(e) => setPlanSummary(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={handleSend}>
            予定を追加
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default AddPlan;
