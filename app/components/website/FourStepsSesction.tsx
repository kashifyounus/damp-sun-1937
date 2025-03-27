import React from "react";
import { HoverEffect } from "../acertinity/ui/card-hover-effect";

const FourStepsSesction = () => {
  const fourSteps = [
    {
      title: "Fill Form",
      description:
        "Fill out the complete GAMCA medical appointment form with your correct information.",
      link: "/appointment",
    },
    {
      title: "Make Payment",
      description:
        "Fill out the complete GAMCA medical appointment form with your correct information.",
      link: "/appointment",
    },
    {
      title: "Get Appointment",
      description:
        "After receiving payment we done GAMCA/WAFID registration process in 30 mints.",
      link: "/appointment",
    },
    {
      title: "Download Slip",
      description:
        "We will send you slip in pdf format via email and Whatsapp so you can download that easily.",
      link: "/appointment",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center py-20 ">
     <div className="text-center text-4xl font-bold mb-10 font-sans">
          How It Works – Quick & Easy Process
        </div>
        <HoverEffect items={fourSteps} />
    </div>
  );
};

export default FourStepsSesction;
