"use client";
import { company_type } from "@/type/interface";
import NumberFormat from "../Conversion/NumberFormat";
import { updateCompany } from "@/lib/companyService";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

interface Props {
  company: company_type;
}

const CompanySummary = ({ company }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: company.name,
    capital: String(company.capital),
    director: company.director,
    summary: company.summary,
    scale: company.scale,
    priority: company.priority,
  });

  const handleSave = async () => {
    try {
      await updateCompany(company.id as string, {
        name: editValues.name,
        capital: Number(editValues.capital),
        director: editValues.director,
        summary: editValues.summary,
        scale: editValues.scale as company_type["scale"],
        priority: editValues.priority as company_type["priority"],
      });
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  };

  if (isEditing) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
        }}
      >
        <TextField
          label="企業名"
          value={editValues.name}
          onChange={(e) =>
            setEditValues({ ...editValues, name: e.target.value })
          }
          fullWidth
        />

        <TextField
          label="資本金"
          type="number"
          value={editValues.capital}
          onChange={(e) =>
            setEditValues({ ...editValues, capital: e.target.value })
          }
          fullWidth
        />

        <TextField
          label="代表取締役"
          value={editValues.director}
          onChange={(e) =>
            setEditValues({ ...editValues, director: e.target.value })
          }
          fullWidth
        />

        <TextField
          label="その他情報"
          value={editValues.summary}
          onChange={(e) =>
            setEditValues({ ...editValues, summary: e.target.value })
          }
          multiline
          rows={4}
          fullWidth
        />

        <div>
          <div style={{ marginBottom: "8px" }}>
            スケール：{editValues.scale}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {(["大", "中", "小"] as const).map((v) => (
              <Button
                key={v}
                variant={editValues.scale === v ? "contained" : "outlined"}
                onClick={() =>
                  setEditValues({
                    ...editValues,
                    scale: v,
                  })
                }
              >
                {v}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ marginBottom: "8px" }}>
            優先度：{editValues.priority}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {(["大", "中", "小"] as const).map((v) => (
              <Button
                key={v}
                variant={editValues.priority === v ? "contained" : "outlined"}
                onClick={() =>
                  setEditValues({
                    ...editValues,
                    priority: v,
                  })
                }
              >
                {v}
              </Button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <Button variant="outlined" onClick={() => setIsEditing(false)}>
            キャンセル
          </Button>

          <Button variant="contained" onClick={handleSave}>
            保存
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "1rem",
            marginBottom: "4px",
            color: "#666",
            borderBottom: "1px solid #666",
          }}
        >
          資本金
        </div>

        <div
          style={{
            fontSize: "1.4rem",
          }}
        >
          <NumberFormat value={company.capital} />
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: "1rem",
            marginBottom: "4px",
            color: "#666",
            borderBottom: "1px solid #666",
          }}
        >
          代表取締役
        </div>

        <div style={{ fontSize: "1.4rem" }}>{company.director}</div>
      </div>

      <div>
        <div
          style={{
            fontSize: "1rem",
            color: "#666",
            marginBottom: "4px",
            borderBottom: "1px solid #666",
          }}
        >
          その他情報
        </div>

        <div
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {company.summary}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "15px",
              color: "#666",
              marginBottom: "4px",
            }}
          >
            スケール
          </div>

          <Button variant="outlined">{company.scale}</Button>
        </div>

        <div>
          <div
            style={{
              fontSize: "15px",
              color: "#666",
              marginBottom: "4px",
            }}
          >
            優先度
          </div>

          <Button variant="outlined">{company.priority}</Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" onClick={() => setIsEditing(true)}>
          編集
        </Button>
      </div>
    </div>
  );
};

export default CompanySummary;
