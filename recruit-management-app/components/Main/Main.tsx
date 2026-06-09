'use client'
import React, { useState, useEffect } from "react";
import LeftContent from "./LeftContent/LeftContent";
import RightContent from "./RightContent/RightContent";
import { getCompanies } from "@/lib/companyService";
import { company_type } from "@/type/interface";

const Main = () => {
  const [companies, setCompanies] = useState<company_type[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCompanies()
      .then((data) => {
        setCompanies(data)
        if (data.length > 0) setSelectedId(data[0].id as unknown as string)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const selectedCompany = companies.find((c) => c.id === selectedId);

  if (!selectedCompany) return <div>データがありません</div>;

  if (loading) return <div className="p-8">読み込み中...</div>
  if (companies.length === 0) return <div className="p-8">企業が登録されていません</div>
  if (!selectedCompany) return null

  return (
    <div className="main flex">
      <LeftContent
        companies={companies}
        selectedId={selectedId}
        onSelect={setSelectedId} />
      <RightContent company={selectedCompany} />
    </div>
  );
};

export default Main;