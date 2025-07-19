import { Suspense } from "react";
import SuccessPageContent from "./SuccessPageContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading your confirmation...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
