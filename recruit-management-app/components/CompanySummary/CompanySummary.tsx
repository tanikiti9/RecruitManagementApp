import { company_type } from "@/type/interface";
import React from "react";
import NumberFormat from "../Conversion/NumberFormat";

interface Props {
  company: company_type
}

const CompanySummary = ({ company }: Props) => {
  return (
    <>
      <div style={{display: "flex"}}>資本金：<NumberFormat value={company.capital} /></div>
      <div>代表取締役：{company.director}</div>
      <div>その他情報<br />{company.summary}</div>
    </>
  )
};

export default CompanySummary;
