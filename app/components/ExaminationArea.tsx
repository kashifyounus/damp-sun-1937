import React from "react";
import { motion } from "framer-motion";

const ExaminationArea = () => {
  const requirements = [
    {
      image: "doctor.png", // Replace with your image path
      title: "Physical Examination",
    },
    {
      image: "xrays.png", // Replace with your image path
      title: "X-Ray Examination",
    },
    {
      image: "bloodexam.png", // Replace with your image path
      title: "Blood Examination",
    },
    {
      image: "cardiac.png", // Replace with your image path
      title: "Cardiac Examination",
    },
  ];

  // Framer Motion variants for border animation
  const borderVariants = {
    hover: {
      scale: 1.05,
      borderColor: "#3B82F6", // Blue border color on hover
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center  bg-yellow-400 
      px-4 py-20 lg:px-24 lg:py-24 xl:px-32 xl:py-32"
      style={{
        fontFamily: "Poppins",
      }}
    >
      <div className="bg-transparent max-w-full w-full">
        <h1 className="text-3xl font-bold text-center mb-8"
        style={{
          fontFamily: "Poppins",
        }}>
          Examination Area
        </h1>
        <h2 className="text-xl font-semibold text-center mb-6">
          GAMCA Registration Requirements
        </h2>
        <div className="bg-white rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 p-4">
          {requirements.map((requirement, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-4 border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer bg-w"
              whileHover="hover"
              variants={borderVariants}
            >
              <div className="w-ful h-full mb-4 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={requirement.image}
                  alt={requirement.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{requirement.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExaminationArea;
