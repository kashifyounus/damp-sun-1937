import { MetaFunction } from "@remix-run/node";
import RootLayout from "./_layout";
import { Company } from "Constant";

export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Token Cancellation Policy" },
    { name: "description", content: "Cancellation Policy for GAMCA Token" },
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

const CancellationPolicy = () => {
  return (
    <RootLayout>
      <div
        className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg my-40 pt-10 border-t-4 border-blue-700"
        style={{
          fontFamily: "Poppins",
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-6 bg-blue-700 text-white p-2 rounded-lg">
          Our Cancellation Terms
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Cancellation Policy for GAMCA Token
          </h2>
        </div>

        <div className="mb-8">
          <p className="text-gray-700">
            At GAMCA Token, you can cancel your request at any time before
            payment is processed. However, once the payment has been completed,
            you will be responsible for the full payment, and the service cannot
            be cancelled. Please ensure that all details are correct before
            proceeding with the payment.
          </p>
        </div>
      </div>
    </RootLayout>
  );
};

export default CancellationPolicy;
