import { companies } from "@/data/companies";
import SummaryCard from "./SummaryCard";


const LeftContent = () => {
  return (
    <div className="left">
      {companies.map((company) => (
          <SummaryCard
            key={company.id}
            interns={company.plan}
          />
      ))}
    </div>
  );
};

export default LeftContent;
