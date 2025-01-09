import { FeedbackForm } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center font-retrievce font-normal bg-black text-[#fff] pb-40">
      <Suspense>
        <FeedbackForm />
      </Suspense>
    </main>
  );
}
