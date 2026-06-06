import CompanySchedule from "@/components/CompanySummary/CompanySchedule";
import CompanySummary from "@/components/CompanySummary/CompanySummary";
import RightHeader from "@/components/Header/RightHeader";
import React from "react";

const RightContent = () => {
  return (
      <div className="right">
        <div className="right-header"><RightHeader /></div>
        <div className="right-main  flex">
          <div className="Summary">
            <CompanySummary />
          </div>
          <div className="Schedule">
            <CompanySchedule />
          </div>
        </div>
      </div>
  );
};

export default RightContent;
