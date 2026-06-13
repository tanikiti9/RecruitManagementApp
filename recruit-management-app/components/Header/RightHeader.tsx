"use client";
import { company_type } from "@/type/interface";
import { deleteCompany } from "@/lib/companyService";
import { useRouter } from "next/navigation";

interface Props {
  company: company_type;
}

const RightHeader = ({ company }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`「${company.name}」を削除しますか？`)) return;
    try {
      await deleteCompany(company.id as string);
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <span>{company.name}</span>
      <button onClick={handleDelete}>会社を削除</button>
    </div>
  );
};

export default RightHeader;
