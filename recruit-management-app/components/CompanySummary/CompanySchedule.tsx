import React from "react";
import { company_type } from "@/type/interface";
import SummaryCardRight from "../Main/RightContent/SummaryCardRight";

interface Props {
  company: company_type;
}

const CompanySchedule = ({ company }: Props) => {
  return (
    <div>
      <SummaryCardRight interns={company.plan} companyId={company.id as string} />
    </div>
  );
};

export default CompanySchedule;
