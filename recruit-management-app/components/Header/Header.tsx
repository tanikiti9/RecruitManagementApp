"use client";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header
      style={{
        width: "100%",
        height: "75px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "cyan",
        position: "fixed"
      }}
    >
      <div>
        <Link href="/" style={{ textDecoration: "none", color: "black", paddingLeft: "20px" }}>
          就活管理
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          width: "22%",
          height: "75px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Link href="/addpage">
          <div style={{borderBottom: "2px solid #1976d2"}}>
            <Button variant="text" className="add-btn">企業追加</Button>
          </div>
        </Link>
        <Link href="/addplan">
          <div style={{borderBottom: "2px solid #1976d2"}}>
            <Button variant="text" className="add-btn">予定を追加</Button>
          </div>
        </Link>
        <div style={{borderBottom: "2px solid #1976d2"}}>
          <Button variant="text" className="add-btn" onClick={handleLogout}>
            ログアウト
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
