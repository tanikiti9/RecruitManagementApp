'use client'
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSend = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            router.push("/")
        } catch {
            if (error) console.error
        }
    }

    return (
        <div>
            <h1>ユーザー登録</h1>
            <input
                type='email'
                placeholder='メールアドレス'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input  
                type='password'
                placeholder='パスワード'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleSend}
            >
                登録
            </button>
        </div>
    )
}

export default page