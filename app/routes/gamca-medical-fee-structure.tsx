
import "@fontsource/poppins";
import { Company } from "Constant";
import ButtonAppointment from "~/components/ButtonAppointment";
import ButtonWhatsApp from "~/components/ButtonWhatsApp";
import RootLayout from "./_layout";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Fee Structure" },
    { name: "description", content: "GAMCA Fee Structure" },
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

const FeeStructure = () => {
  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-40 border-t-4 border-blue-700"
      style={{
        fontFamily : "Poppins",
      }}>
        <h1 className="text-2xl font-bold text-center mb-10">
        GAMCA Medical Fees
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
          Fee Structure for Gulf Countries
          </h2>
          <p className="text-gray-700 mb-4">
          GAMCA Medical fees vary by country: 
          Saudi Arabia – Rs. 4000.00+, 
          UAE – Rs. 4000.00+,
          Qatar – Rs. 4000.00+,
          Oman – Rs. 4000.00+, 
          Bahrain – Rs. 4000.00+, and 
          Kuwait – Rs. 4000.00+. 
          These fees cover the mandatory medical examination required for expatriates seeking visas in these Gulf Cooperation Council (GCC) countries.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">CONTACT US</h2>
          <p className="text-gray-700 mb-4">Need GAMCA Test Appointment?</p>
          <p className="text-gray-700 mb-4">Call To Ask Any Question</p>
          <p className="text-gray-700 mb-4 font-bold">{Company.phone}</p>
          <div className="flex justify-center space-x-4">
            <ButtonAppointment />
            <ButtonWhatsApp />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default FeeStructure;
