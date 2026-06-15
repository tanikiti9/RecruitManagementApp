"use client";
import DateFormat from "@/components/Conversion/DateFormat";
import TimeFormat from "@/components/Conversion/TimeFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { intern } from "@/type/interface";
import { deletePlan, updatePlan } from "@/lib/companyService";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

interface Props {
  interns: intern[];
  companyId: string;
}

const SummaryCard = ({ interns, companyId }: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<intern>({
    date: "",
    time: "",
    title: "",
    place: "",
  });
  const [openIndexes, setOpenIndexes] = useState<boolean[]>([]);

  const toggleOpen = (index: number) => {
    setOpenIndexes((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleEditStart = (intern: intern, index: number) => {
    setEditingIndex(index);
    const d = String(intern.date);
    const dateForInput = `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
    const t = String(intern.time).padStart(4, "0");
    const timeForInput = `${t.slice(0, 2)}:${t.slice(2, 4)}`;
    setEditValues({ ...intern, date: dateForInput, time: timeForInput });
  };

  const handleEditSave = async (oldPlan: intern) => {
    try {
      const newPlan: intern = {
        date: editValues.date.replace(/-/g, ""),
        time: editValues.time.replace(":", ""),
        title: editValues.title,
        place: editValues.place,
      };
      await updatePlan(companyId, oldPlan, newPlan);
      setEditingIndex(null);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async (plan: intern) => {
    if (!confirm(`「${plan.title}」を削除しますか？`)) return;
    try {
      await deletePlan(companyId, plan);
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
    }
  };

  return (
    <div>
      {interns.map((intern, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "16px",
              }}
            >
              <TextField
                label="日付"
                type="date"
                value={editValues.date}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    date: e.target.value,
                  })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />

              <TextField
                label="時間"
                type="time"
                value={editValues.time}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    time: e.target.value,
                  })
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />

              <TextField
                label="タイトル"
                value={editValues.title}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    title: e.target.value,
                  })
                }
                fullWidth
              />

              <TextField
                label="場所"
                value={editValues.place}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    place: e.target.value,
                  })
                }
                fullWidth
              />

              <TextField
                label="メモ"
                value={editValues.summary ?? ""}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    summary: e.target.value,
                  })
                }
                multiline
                rows={4}
                fullWidth
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setEditingIndex(null)}
                >
                  キャンセル
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handleEditSave(intern)}
                >
                  保存
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, fontSize: "1.75rem" }}>
                      <DateFormat value={String(intern.date)} />
                    </div>
                    <div style={{ flex: 1, fontSize: "1.75rem" }}>
                      <TimeFormat
                        value={String(intern.time).padStart(4, "0")}
                      />
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: "1.5rem" }}>{intern.title}</span>{" "}
                    <span style={{ fontSize: "1.5rem" }}>{intern.place}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", height: "70px" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditStart(intern, index)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(intern)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
              <div
                onClick={() => toggleOpen(index)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>詳細</span>
                <span style={{ marginLeft: "auto" }}>
                  {openIndexes[index] ? "▲" : "▼"}
                </span>
              </div>
              {openIndexes[index] && (
                <div style={{ fontSize: "1.25rem" }}>
                  <p>{intern.summary ?? "メモがありません"}</p>
                </div>
              )}
              <hr style={{ marginLeft: "0", marginRight: "0" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
