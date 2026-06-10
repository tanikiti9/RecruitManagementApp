'use client'
import SummaryCard from "./SummaryCard";
import { company_type, intern } from "@/type/interface";


interface PlanWithCompany extends intern {
  companyId: string
  companyName: string
}

interface Props {
  companies: company_type[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const LeftContent = ({ companies, selectedId, onSelect }: Props) => {

  const allPlans: PlanWithCompany[] = companies
    .flatMap((company) =>
      company.plan.map((plan) => ({
        ...plan,
        companyId: company.id as unknown as string,
        companyName: company.name,
      }))
    )
    .sort((a, b) => {
      // date: 20260615, time: 1330 を組み合わせて比較
      const aVal = a.date * 10000 + a.time
      const bVal = b.date * 10000 + b.time
      return aVal - bVal //ここ難しい
    })
  return (
    <div style={{
      backgroundColor: "#FFFFFF",
      height: "calc(100vh - 95px)",
      flex: "1"
    }}>
      {allPlans.length === 0 && (
        <p>予定がありません</p>
      )}
      {allPlans.map((plan, index) => (
        <div key={index}
          onClick={() => onSelect(plan.companyId)}
          style={{ 
            padding: "10px",
            marginLeft: "10px",
            marginRight: "10px"
           }}
        >
          <p>{plan.companyName}</p>
          <SummaryCard interns={[plan]} />
          <div style={{
            height: "1px",
            backgroundColor: "#CCCCCC",
          }} />
        </div>
      ))}
    </div>
  );
};

export default LeftContent;