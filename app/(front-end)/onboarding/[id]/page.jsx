import OnboardingForm from "@/components/frontend/OnboardingForm";
import React from "react";

export default function page({ params: { id } }) {
  return (
    <>
      <OnboardingForm id={id} />
    </>
  );
}
