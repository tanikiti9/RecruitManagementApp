"use client";
import { auth } from "@/lib/firebase";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSend = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch {
      if (error) console.error;
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: "75px",
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        ユーザー登録
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextField
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleSend}
        >
          登録
        </Button>
        <Link
          href="/login"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography
            color="primary"
            sx={{
              textAlign: "center",
            }}
          >
            ログインする
          </Typography>
        </Link>
      </div>
    </Paper>
  );
};

export default page;
