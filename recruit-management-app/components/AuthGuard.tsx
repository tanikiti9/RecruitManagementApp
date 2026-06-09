'use client'
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (loading) return <div className="p-8">読み込み中...</div>;

    return <>{children}</>;
}