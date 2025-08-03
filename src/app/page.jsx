import { Suspense } from "react";
import ClientPage from "@/app/ClientPage";

export default function HomePageWrapper() {
  return (
    <Suspense fallback={<div className="text-center text-white p-10">Loading...</div>}>
      <ClientPage />
    </Suspense>
  );
}
