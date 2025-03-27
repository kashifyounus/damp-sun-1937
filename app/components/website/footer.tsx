import { Link } from "@remix-run/react";
import { Company, PakCities } from "Constant";
import { useWPStore } from "~/context/configurationStore";

export default function Footer() {
  const { medicalCenterNames } = useWPStore();

  return (
    <footer className="bg-blue-700 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          
          <div className="flex flex-col justify-center items-center">
            <div>
              <img src={Company.logo} alt="Logo" className="h-[120px] w-auto" />
            </div>
            <div>
              <h3 className="text-center text-white font-bold text-lg mb-4">
                {Company.name}
              </h3>
              <p className="text-sm">Need Gamca Online Test Appointment?</p>
            </div>
          </div>

          <div className="flex flex-col justify-between items-center">
            <div className="">
              <h4 className="text-center text-white font-semibold mb-4">
                Gamca Token Center
              </h4>
            </div>

            <div className="flex items-stretch space-x-2 mb-4">
              <ul className="space-y-2 text-sm">
                {/* Display first half of the cities in the first column */}
                {medicalCenterNames.slice(0, Math.ceil(medicalCenterNames.length / 2)).map(
                  (city, index) => (
                    <li key={index}>
                      <Link
                        to="/appointment"
                        className="hover:underline hover:text-white transition-colors"
                      >
                        {city}
                      </Link>
                    </li>
                  )
                )}
              </ul>
              <ul className="space-y-2 text-sm">
                {/* Display second half of the cities in the second column */}
                {medicalCenterNames.slice(Math.ceil(medicalCenterNames.length / 2)).map(
                  (city, index) => (
                    <li key={index}>
                      <Link
                        to="/appointment"
                        className="hover:underline hover:text-white transition-colors"
                      >
                        {city}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between items-center">
            <div className="">
              <h4 className="text-center text-white font-semibold mb-4">
                Contact Us
              </h4>
            </div>
            <div className="">
              <p>{Company.address}</p>
            </div>
            <div className="">
              <p className="mt-2">Email: {Company.email}</p>
            </div>
            <div className="">
              <p>WhatsApp: {Company.whatsApp}</p>
            </div>
            <div className="">
              <p>Phone: {Company.phone}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between items-center w-full">
            <div>
              <h4 className="text-center text-white font-semibold mb-4">
                Important Links
              </h4>
            </div>
            <div className="text-center">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/refund-policy"
                    target="_blank"
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cancellation-policy"
                    target="_blank"
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/medical-report-check-online"
                    target="_blank"
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Medical Report Online
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gamca-medical-fee-structure"
                    target="_blank"
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Fee Structure
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    className="hover:underline hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} {Company.name}. All rights
            reserved.
          </p>
          <p>
            Developed & Designed By{" "}
            <Link
              to="https://kashifyounus.com/"
              target="_blank"
              className="text-yellow-500 hover:underline hover:text-white transition-colors"
            >
              Kashif Younus
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
