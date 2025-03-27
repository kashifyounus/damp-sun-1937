import React from "react";
import RootLayout from "./_layout";
import "@fontsource/poppins";
import { MetaFunction } from "@remix-run/node";
import { Company } from "Constant";

export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Token Refund Policy" },
    { name: "description", content: "Refund Policy for GAMCA Token" },
     {
          name: "keywords",
          content:
            "#wafidmedicalpakistan #wafidmedicalsliponline #gamcamedicalpakistan #wafid #gamcapakistan #wafidpakistan #dubaimedical #gamcamedical #gamcaappointment #wafidappointment #wafidmedical #saudiarabia🇸🇦 #gamcaislamabad #gamcamedicalappointment #gamcamedicalonline #Gamcalahore #gamcapeshawar #gamcamedicalcheck #gamcagujranwala #gamcakarachi #gamcamultan #gamcarawalpindi #Gamcamedicalstatus #GamcaMedicalfeesforsaudiarabia #GamcaMedicalfeesforuae #GamcaMedicalfeesforoman #saudiarabia #گیمکا #Gamca #gamcamedicalreport #omanmedical #muscatmedical #bahrainmedical #sudiamedical #kuwaitmedical #qatarmedical @gamcapakistanfee #gamcaappointment #wafidappointment #wafidreportchek #wafidonlinereport #wafidmedicalappointment #wafidpakistan",
        },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
        { name: "google", content: "notranslate" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Muhammad Saleem" },
        { name: "rating", content: "general" },
        { name: "distribution", content: "global" },
        { name: "revisit-after", content: "7 days" },
        { name: "language", content: "EN" },
        { name: "reply-to", content: Company.email },
  ];
};

//Cancellation Policy

const RefundPolicy = () => {
  return (
    <RootLayout>
      <div
        className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg my-40 pt-10 border-t-4 border-blue-700"
        style={{
          fontFamily: "Poppins",
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-6 bg-blue-700 text-white p-2 rounded-lg">
          Refund Policy
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Terms and Conditions for Refunds
          </h2>
          <p className="text-gray-700">Rs 4000/- for appointment.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Refund Policy for GAMCA Token
          </h2>
          <p className="text-gray-700 mb-4">
            After booking if you Received GCC Slip there is no cancel or no
            refund any amount.
          </p>
          <p className="text-gray-700">
            Once you have booked our service, if you choose to cancel because
            the GCC slip is not received within 24 hours, a cancellation fee of
            1000 will be deducted from the refund. The remaining amount will be
            credited to the same account within 7 working days.
          </p>
        </div>
      </div>
    </RootLayout>
  );
};

export default RefundPolicy;
