'use client'
import React, { useState, useEffect } from "react";
import LeftContent from "./LeftContent/LeftContent";
import RightContent from "./RightContent/RightContent";
import { getCompanies } from "@/lib/companyService";
import { company_type } from "@/type/interface";

const Main = () => {
  const [companies, setCompanies] = useState<company_type[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data);
      if (data.length > 0) setSelectedId(data[0].id);
    });
  }, []);

  const selectedCompany = companies.find((c) => c.id === selectedId);

  if (!selectedCompany) return <div>データがありません</div>;

  return (
    <div className="main flex">
      <LeftContent onSelect={setSelectedId} />
      <RightContent company={selectedCompany} />
    </div>
  );
};

export default Main;