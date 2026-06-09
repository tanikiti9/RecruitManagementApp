'use client'
import SummaryCard from "./SummaryCard";
import { company_type, intern } from "@/type/interface";


interface PlanWithCompany extends intern {
  companyId: string
  companyName: string
}

interface Props {
  companies: company_type[]
  selectedId: string
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
    <div className="left overflow-y-auto">
      {allPlans.length === 0 && (
        <p className="p-4 text-gray-500">予定がありません</p>
      )}
      {allPlans.map((plan, index) => (
        <div
          key={index}
          onClick={() => onSelect(plan.companyId)}
          className={`cursor-pointer p-3 border-b hover:bg-gray-100 ${selectedId === plan.companyId ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
            }`}
        >
          <p className="text-sm font-bold">{plan.companyName}</p>
          <SummaryCard interns={[plan]} />
        </div>
      ))}
    </div>
  );
};

export default LeftContent;