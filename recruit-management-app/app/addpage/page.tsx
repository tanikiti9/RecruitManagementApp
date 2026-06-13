import AuthGuard from "@/components/AuthGuard";
import AddInfo from "@/components/Main/AddContents/AddInfo";
import React from "react";

const page = () => {
  return (
    <div>
      <AuthGuard>
        <AddInfo />
      </AuthGuard>
    </div>
  );
};

export default page;
