import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { company_type } from "@/type/interface";

export const addCompany = async (company: Omit<company_type, "id">) => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("ログインが必要です");

    await addDoc(collection(db, "users", uid, "companies"), {
        ...company,
        createdAt: serverTimestamp(),
    });
};

export const getCompanies = async (): Promise<company_type[]> => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("ログインが必要です");

    const snapshot = await getDocs(
        collection(db, "users", uid, "companies")
    );

    return snapshot.docs.map((doc) => ({
        id: doc.id as unknown as number,
        ...doc.data(),
    })) as company_type[];
};