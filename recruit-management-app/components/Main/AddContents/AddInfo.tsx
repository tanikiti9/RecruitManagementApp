"use client";
import { auth, db } from "@/lib/firebase";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddInfo = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [director, setDirector] = useState("");
  const [summary, setSummary] = useState("");
  const [scale, setScale] = useState<"大" | "中" | "小" | "">("");
  const [priority, setPriority] = useState<"大" | "中" | "小" | "">("");

  const handleSend = async () => {
    if (Number(capital) < 0) {
      alert("資本金にマイナスは使えません");
      return;
    }
    if (!name || !capital || !director || !scale || !priority) {
      alert("すべての項目を入力してください");
      return;
    }

    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert("ログインが必要です");
      return;
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
      });
      alert("登録しました！");
      router.push("/");
    } catch (e) {
      console.error(e);
      alert("登録に失敗しました");
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 1.5,
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        企業情報の登録
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextField
          label="企業名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="資本金"
          type="number"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
          fullWidth
        />

        <TextField
          label="代表取締役"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          fullWidth
        />

        <TextField
          label="その他情報"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />

        <div>
          <Typography sx={{ mb: 1 }}>スケール：{scale || "未選択"}</Typography>

          <div style={{ display: "flex", gap: "8px" }}>
            {(["大", "中", "小"] as const).map((v) => (
              <Button
                key={v}
                variant={scale === v ? "contained" : "outlined"}
                onClick={() => setScale(v)}
              >
                {v}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Typography sx={{ mb: 1 }}>優先度：{priority || "未選択"}</Typography>

          <div style={{ display: "flex", gap: "8px" }}>
            {(["大", "中", "小"] as const).map((v) => (
              <Button
                key={v}
                variant={priority === v ? "contained" : "outlined"}
                onClick={() => setPriority(v)}
              >
                {v}
              </Button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={handleSend}>
            登録
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default AddInfo;
