"use client";
import { auth } from "@/lib/firebase";
import { Button, Paper, TextField, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();
  const handleSend = async () => {
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (e: unknown) {
      if (e instanceof Error) {
        const code = (e as { code?: string }).code;
        switch (code) {
          case "auth/invalid-email":
            setError("メールアドレスの形式が正しくありません");
            break;
          case "auth/user-not-found":
            setError("このメールアドレスは登録されていません");
            break;
          case "auth/wrong-password":
            setError("パスワードが間違っています");
            break;
          case "auth/email-already-in-use":
            setError("このメールアドレスはすでに使われています");
            break;
          case "auth/weak-password":
            setError("パスワードは6文字以上で入力してください");
            break;
          case "auth/invalid-credential":
            setError("メールアドレスまたはパスワードが間違っています");
            break;
          default:
            setError("エラーが発生しました：" + e.message);
        }
      }
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
        ログイン
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
          ログイン
        </Button>

        <Link
          href="/auth"
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
            アカウントを新規登録する
          </Typography>
        </Link>
      </div>
    </Paper>
  );
}

export default page;
