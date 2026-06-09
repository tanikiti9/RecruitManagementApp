import AuthGuard from "@/components/AuthGuard";
import Main from "@/components/Main/Main";

export default function Home() {
  return (
    <AuthGuard>
      <Main />
    </AuthGuard>
  );
}
