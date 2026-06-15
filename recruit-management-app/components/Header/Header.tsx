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
        backgroundColor: "#1976d2",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "white",
            paddingLeft: "20px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          就活管理
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          height: "75px",
          alignItems: "center",
          gap: "12px",
          paddingRight: "20px",
        }}
      >
        <Link href="/addpage" style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            sx={{
              color: "white",
              borderBottom: "2px solid transparent",
              borderRadius: 0,
              height: "75px",
              "&:hover": {
                borderBottom: "2px solid white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            企業追加
          </Button>
        </Link>

        <Link href="/addplan" style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            sx={{
              color: "white",
              borderBottom: "2px solid transparent",
              borderRadius: 0,
              height: "75px",
              "&:hover": {
                borderBottom: "2px solid white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            予定追加
          </Button>
        </Link>

        <Button
          variant="text"
          onClick={handleLogout}
          sx={{
            color: "white",
            borderBottom: "2px solid transparent",
            borderRadius: 0,
            height: "75px",
            "&:hover": {
              borderBottom: "2px solid white",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          ログアウト
        </Button>
      </div>
    </header>
  );
};

export default Header;
