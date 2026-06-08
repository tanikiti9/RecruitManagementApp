'use client'
import React, { useState } from "react";
import LeftContent from "./LeftContent/LeftContent";
import RightContent from "./RightContent/RightContent";
import { companies } from "@/data/companies";

const Main = () => {
  const [selectedId, setSelectedId] = useState<number>(companies[0].id)
  const selectedCompany = companies.find((c) => c.id === selectedId)!;
  console.log(selectedId)
  return (
    <div className="main flex">
      <LeftContent onSelect={setSelectedId}/>
      <RightContent company={selectedCompany}/>
    </div>
  );
};

export default Main;
