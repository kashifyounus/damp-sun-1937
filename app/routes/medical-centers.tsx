import { MetaFunction } from "@remix-run/node";
import { Company } from "Constant";
import { GridBackground } from "~/components/21stcomponents/glow-card";
import Footer from "~/components/website/footer";
import Navbar from "~/components/website/navbar";
import { useWPStore } from "~/context/configurationStore";

export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Medical Centers List" },
    { name: "description", content: "GAMCA Medical Centers List" },
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

const GamcaCentersList = () => {
  const { medicalCenters } = useWPStore();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <div className="w-full text-center bg-black ">
          <GridBackground
            className="text-white px-4"
            title="Medical Center Lists"
            description="GAMCA medical centers in pakistan"
            medicalCenters={medicalCenters}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GamcaCentersList;
