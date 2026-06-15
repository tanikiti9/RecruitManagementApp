"use client";
import { company_type } from "@/type/interface";
import { deleteCompany } from "@/lib/companyService";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

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
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "16px",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{company.name}</div>
      <div>
        <Button variant="text" color="error" onClick={handleDelete}>
          会社を削除
        </Button>
      </div>
    </div>
  );
};

export default RightHeader;
