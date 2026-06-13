import React from "react";
import SummaryCard from "../Main/LeftContent/SummaryCard";
import { company_type } from "@/type/interface";

interface Props {
  company: company_type;
}

const CompanySchedule = ({ company }: Props) => {
  return (
    <div>
      <SummaryCard interns={company.plan} companyId={company.id as string} />
    </div>
  );
};

export default CompanySchedule;
