import { motion } from "framer-motion";
import {
  ClipboardList,
  CreditCard,
  Download
} from "lucide-react";
import ButtonAppointment from "../ButtonAppointment";
import ButtonWhatsApp from "../ButtonWhatsApp";

const GAMCAProcess = () => {
  const steps = [
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Fill Form",
      description:
        "Fill out the complete GAMCA medical appointment form with your correct information.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Make Payment",
      description:
        "You can pay using Easypaisa, JazzCash, or local bank transfer, whichever suits you best.",
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Get Appointment",
      description:
        "After receiving payment we done GAMCA/WAFID registration process in 30 mints.",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Download Slip",
      description:
        "We will send you slip in pdf format via email and Whatsapp so you can download that easily.",
    },
  ];
  const borderVariants = {
    hover: {
      scale: 1.05,
      borderColor: "#3B82F6", // Blue border color on hover
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full 
      bg-gray-200 py-20 px-4 lg:px-18 xl:px-56"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
        whileHover="hover"
        variants={borderVariants}
      >
        <h1 className="text-xl font-bold text-center font-poppins">
          How To Get GAMCA Medical
        </h1>
        <h1 className="text-3xl font-bold text-center mb-8">
          Appointment {new Date().getFullYear()} In Pakistan!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white flex flex-col items-center text-center border-black border p-6 rounded-lg shadow-lg"
            >
              <div className="bg-blue-700 text-white p-4 rounded-full mb-4">
                {step.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex flex-col lg:flex-row gap-4 items-center justify-center">
          <ButtonAppointment />
          <ButtonWhatsApp />
        </div>
      </motion.div>
    </div>
  );
};

export default GAMCAProcess;
