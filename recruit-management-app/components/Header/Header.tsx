import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <Link href="/">就活管理</Link>
      </div>
      <Link href="/addpage">
        <button className="add-btn">新規追加</button>
      </Link>
    </header>
  );
};

export default Header;
