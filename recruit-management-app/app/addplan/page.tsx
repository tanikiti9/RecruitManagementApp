import AddPlan from "@/components/AddPlan/AddPlan";
import AuthGuard from "@/components/AuthGuard";
import React from "react";

const page = () => {
  return (
    <AuthGuard>
      <AddPlan />
    </AuthGuard>
  );
};

export default page;
