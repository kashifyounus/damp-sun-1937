import { MetaFunction } from "@remix-run/node";
import { QueryClientProvider } from "@tanstack/react-query";
import { Company } from "Constant";
import { useEffect } from "react";
import { BookingForm } from "~/components/website/booking-form";
import Footer from "~/components/website/footer";
import Navbar from "~/components/website/navbar";
import { queryClient } from "~/utils/queryClient";

export const meta: MetaFunction = () => {
  return [
    { title: Company.name },
    { name: "description", content: "GAMCA Appointment" },
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

const AppointmentForm = () => {
  useEffect(() => {
    console.log("AppointmentForm");
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="flex bg-slate-500 py-20 justify-center">
        <BookingForm />
      </div>
      <Footer />
    </QueryClientProvider>
  );
};

export default AppointmentForm;
