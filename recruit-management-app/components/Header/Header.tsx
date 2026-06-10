'use client'
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header style={{
      height: "75px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "cyan"
    }}>
      <div>
        <Link href="/" style={{textDecoration: "none", color: "black"}}>就活管理</Link>
      </div>
      <div>
        <Link href="/addpage">
          <button className="add-btn">企業追加</button>
        </Link>
        <Link href="/addplan">
          <button className="add-btn">予定を追加</button>
        </Link>
        <button className="add-btn" onClick={handleLogout}>
          ログアウト
        </button>
      </div>
    </header>
  );
};

export default Header;