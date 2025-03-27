import "@fontsource/poppins";
import { Link } from "@remix-run/react";
import { Company } from "Constant";
import ButtonAppointment from "~/components/ButtonAppointment";
import ButtonWhatsApp from "~/components/ButtonWhatsApp";
import { Button } from "~/components/ui/button";
import RootLayout from "./_layout";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Medical Report Check Online" },
    { name: "description", content: "GAMCA Medical Report Check Online" },
  ];
};

const MedicalReportCheckOnline = () => {
  return (
    <RootLayout>
      <div
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-40 border-t-4 border-blue-700"
        style={{
          fontFamily: "Poppins",
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          WAFID/GAMCA Medical Report Check Online
        </h1>

        <div className="mb-8">
          <p className="text-gray-700 mb-4 text-center">
            Checkout the complete list of all medical centers.
          </p>
          <div className="flex space-x-4 text-center justify-center">
            <Link to="https://wafid.com/medical-status-search/" target="_blank">
              <Button size={"lg"} className="h-16 w-full bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
                View Medical Reports
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Medical Centers List</h2>
          <p className="text-gray-700 mb-4">
            After the system has completed processing your request, the result
            will be displayed on the screen. The status of your medical report
            will be indicated, whether it is "Fit," "Unfit," "Absent," or
            "Referred."
          </p>
          <p className="text-gray-700 mb-4">
            Pay close attention to the status, as it determines your eligibility
            for employment or travel to the GCC countries.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Common Issues Faced during GAMCA Medical Report Check
          </h2>
          <p className="text-gray-700 mb-4">
            While checking your GAMCA medical report online, you may encounter
            some common issues. Here are a few challenges individuals often face
            and how to address them.
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

export default MedicalReportCheckOnline;
