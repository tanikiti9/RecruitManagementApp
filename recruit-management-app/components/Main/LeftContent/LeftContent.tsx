"use client";
import SummaryCard from "./SummaryCard";
import { company_type, intern } from "@/type/interface";

interface PlanWithCompany extends intern {
  companyId: string;
  companyName: string;
}

interface Props {
  companies: company_type[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const LeftContent = ({ companies, selectedId, onSelect }: Props) => {
  const allPlans: PlanWithCompany[] = companies
    .flatMap((company) =>
      company.plan.map((plan) => ({
        ...plan,
        companyId: company.id as unknown as string,
        companyName: company.name,
      })),
    )
    .sort((a, b) => {
      // date: 20260615, time: 1330 を組み合わせて比較
      const aVal = Number(a.date) * 10000 + Number(a.time);
      const bVal = Number(b.date) * 10000 + Number(b.time);
      return aVal - bVal; //ここ難しい
    });
  return (
    <div
      className="LeftBox"
      style={{
        paddingLeft: "15px",
        paddingRight: "10px",
        marginRight: "5px",
        backgroundColor: "#FFFFFF",
        position: "fixed",
        width: "50%",
        height: "calc(100vh - 95px)",
        overflow: "scroll",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          height: "70px",
          alignItems: "center",
          display: "flex",
          paddingLeft: "30px",
          borderBottom: "1px solid #CCCCCC",
        }}
      >
        予定
      </div>

      {allPlans.length === 0 && <p>予定がありません</p>}
      {allPlans.map((plan, index) => (
        <div
          key={index}
          onClick={() => onSelect(plan.companyId)}
          className="box"
          style={{ fontSize: "1.5rem" }}
        >
          <p>{plan.companyName}</p>
          <SummaryCard interns={[plan]} companyId={plan.companyId} />
        </div>
      ))}
    </div>
  );
};

export default LeftContent;
