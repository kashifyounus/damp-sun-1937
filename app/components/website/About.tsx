import { Separator } from "@radix-ui/react-separator";
import React from "react";

const AboutSection = () => {
  const content = {
    title: "Simplified GAMCA Appointment and Slip Services",
    tagline: "About Gamca Medicare",
    description:
      "Gamca Center streamlines the medical examination process for GCC countries. We offer an efficient online service to generate medical slips and facilitate payments for pre-departure check-ups. Candidates can easily book their appointments through our website, which also provides information on approved medical centers. Serving a wide range of locations both locally and internationally, Gamca Center ensures a seamless experience for medical appointments required for employment in the Gulf.",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-20 font-serif">
       <div className="container mx-10 w-full mt-10">
          <h2 className="text-xl font-bold">{content.tagline}</h2>
          <h2 className="text-3xl font-bold">{content.title}</h2>
          <div className="flex justify-end">
            <Separator
              orientation="horizontal"
              className="w-20 h-1 bg-primary mt-2"
            />
          </div>
          <p className="mt-4 text-xl text-justify px-10">{content.description}</p>
        </div>
        <div className="container mx-10 w-full">
          <img
            src={content.image}
            alt="About Us"
            width={300}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
    </div>
  );
};

export default AboutSection;
