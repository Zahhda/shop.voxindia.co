import { Suspense } from "react";
import SuccessPageContent from "./SuccessPageContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-lg">Loading your confirmation...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}