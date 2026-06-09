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
    <div className="left">
      {allPlans.length === 0 && (
        <p>予定がありません</p>
      )}
      {allPlans.map((plan, index) => (
        <div key={index} onClick={() => onSelect(plan.companyId)}>
          <p>{plan.companyName}</p>
          <SummaryCard interns={[plan]} />
        </div>
      ))}
    </div>
  );
};

export default LeftContent;