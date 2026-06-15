import { auth, db } from "./firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { company_type, intern } from "@/type/interface";

export const getCompanies = async (): Promise<company_type[]> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("ログインが必要です");

  const q = query(
    collection(db, "users", uid, "companies"),
    orderBy("createdAt", "asc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as company_type[];
};

export const deletePlan = async (companyId: string, plan: intern) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("ログインが必要です");

  const ref = doc(db, "users", uid, "companies", companyId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const currentPlan = snap.data().plan ?? [];

  const updated = currentPlan.filter(
    (p: intern) =>
      !(
        p.date === plan.date &&
        p.time == plan.time &&
        p.title === plan.title &&
        p.place === plan.place
      ),
  );

  await updateDoc(ref, { plan: updated });
};

export const subscribeCompanies = (
  callback: (companies: company_type[]) => void,
) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("ログインが必要です");

  const q = query(
    collection(db, "users", uid, "companies"),
    orderBy("createdAt", "asc"),
  );

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as unknown as company_type[];
    callback(data);
  });
};

export const deleteCompany = async (companyId: string) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("ログインが必要です");

  const ref = doc(db, "users", uid, "companies", companyId);
  await deleteDoc(ref);
};

export const updatePlan = async (
  companyId: string,
  oldPlan: intern,
  newPlan: intern,
) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("ログインが必要です");

  const ref = doc(db, "users", uid, "companies", companyId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const currentPlan = snap.data().plan ?? [];
  const updated = currentPlan.map((p: any) =>
    p.date == oldPlan.date &&
    p.time == oldPlan.time &&
    p.title === oldPlan.title &&
    p.place === oldPlan.place
      ? {
          date: newPlan.date,
          time: newPlan.time,
          title: newPlan.title,
          place: newPlan.place,
        }
      : p,
  );

  await updateDoc(ref, { plan: updated });
};

export const updateCompany = async (
  companyId: string,
  data: Partial<
    Pick<
      company_type,
      "name" | "capital" | "director" | "summary" | "scale" | "priority"
    >
  >,
) => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("ログインが必要です");

  const ref = doc(db, "users", uid, "companies", companyId);
  await updateDoc(ref, data);
};
