"use client";
import React, { useState, useEffect } from "react";
import LeftContent from "./LeftContent/LeftContent";
import RightContent from "./RightContent/RightContent";
import { subscribeCompanies } from "@/lib/companyService";
import { company_type } from "@/type/interface";

const Main = () => {
  const [companies, setCompanies] = useState<company_type[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeCompanies((data) => {
      setCompanies(data);
      setSelectedId((prev) => {
        const stillExists = data.some((c) => c.id === prev);
        if (stillExists) return prev;
        return (data[0]?.id as string) ?? null;
      });
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const selectedCompany = companies.find((c) => c.id === selectedId);

  if (loading) return <div>読み込み中...</div>;
  if (companies.length === 0) return <div>企業が登録されていません</div>;
  if (!selectedCompany) return null;

  return (
    <div style={{ display: "flex" }}>
      <LeftContent
        companies={companies}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <div
        style={{
          width: "1px",
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#CCCCCC",
        }}
      />
      <RightContent company={selectedCompany} />
    </div>
  );
};

export default Main;
