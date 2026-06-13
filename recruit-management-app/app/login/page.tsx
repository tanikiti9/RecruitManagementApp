"use client";
import { auth } from "@/lib/firebase";
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
    <div>
      <h1>ログイン</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSend}>ログインする</button>
      <Link href={"/auth"}>
        <p>アカウントを新規登録する＞＞</p>
      </Link>
    </div>
  );
};

export default page;
