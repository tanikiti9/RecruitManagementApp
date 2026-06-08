'use client'
import { companies } from "@/data/companies";
import SummaryCard from "./SummaryCard";

interface Props {
  onSelect: (id: number) => void
}

const LeftContent = ({onSelect}: Props) => {
  return (
    <div className="left">
      {companies.map((company) => (
        <div
          key={company.id}
          onClick={() =>onSelect(company.id)}
        >
          <SummaryCard interns={company.plan} />
        </div>
      ))}
    </div>
  );
};

export default LeftContent;