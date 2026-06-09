import { auth, db } from './firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { company_type } from '@/type/interface'

export const getCompanies = async (): Promise<company_type[]> => {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error("ログインが必要です")

  const q = query(
    collection(db, "users", uid, "companies"),
    orderBy("createdAt", "asc")
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as company_type[]
}