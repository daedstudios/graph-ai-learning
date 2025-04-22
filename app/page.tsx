import React from "react";
import Hero from "@/components/landing/hero";
import Info from "@/components/landing/infoCard";
import Cta from "@/components/landing/cta";
import Steps from "@/components/landing/steps";
import LandingNav from "@/components/landing/nav";

export default function Landing() {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-200 to-background">
        <LandingNav />
        <Hero />
      </div>
      <Info />
      <Steps />
      <Cta />
    </>
  );
}
