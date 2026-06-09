import CompanySchedule from "@/components/CompanySummary/CompanySchedule";
import CompanySummary from "@/components/CompanySummary/CompanySummary";
import RightHeader from "@/components/Header/RightHeader";
import { company_type } from "@/type/interface";

interface Props {
  company: company_type
}

const RightContent = ({ company }: Props) => {
  console.log(company)
  return (
    <div className="right">
      <div className="right-header">
        <RightHeader company={company} />
      </div>
      <div className="right-main">
        <div className="Summary">
          <CompanySummary company={company} />
        </div>
        <div className="Schedule">
          <CompanySchedule company={company} />
        </div>
      </div>
    </div>
  );
};

export default RightContent;
