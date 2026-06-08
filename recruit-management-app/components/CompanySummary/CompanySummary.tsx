import { company_type } from "@/type/interface";
import React from "react";

interface Props {
  company: company_type
}

const CompanySummary = ({ company }: Props) => {
  return (
    <>
      <div>{company.capital}</div>
      <div>{company.director}</div>
      <div>{company.summary}</div>
    </>
  )
};

export default CompanySummary;
