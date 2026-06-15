import CompanySchedule from "@/components/CompanySummary/CompanySchedule";
import CompanySummary from "@/components/CompanySummary/CompanySummary";
import RightHeader from "@/components/Header/RightHeader";
import { company_type } from "@/type/interface";

interface Props {
  company: company_type;
}

const RightContent = ({ company }: Props) => {
  console.log(company);
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        width: "50%",
        marginLeft: "50%",
        padding: "5px",
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          height: "65px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "10px",
          marginRight: "10px",
          borderBottom: "1px solid #CCCCCC",
        }}
      >
        <RightHeader company={company} />
      </div>
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 150px)",
          padding: "10px",
        }}
      >
        <div style={{ flex: 1, padding: "10px" }}>
          <CompanySummary company={company} />
        </div>
        <div
          style={{
            width: "1px",
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "#CCCCCC",
          }}
        />
        <div 
        className="RightBox"
        style={{
          flex: 1,
          padding: "10px",
          overflow: "scroll",
          overflowX: "hidden"
        }}>
          <CompanySchedule company={company} />
        </div>
      </div>
    </div>
  );
};

export default RightContent;
