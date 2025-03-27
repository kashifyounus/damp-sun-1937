import { cn } from "@/lib/utils";
import { PakCities } from "Constant";
import CountryCard from "../website/country-card";

interface GridBackgroundProps {
  medicalCenters: any[];
  title: string;
  description: string;
  showAvailability?: boolean;
  className: string;
}

export function GridBackground({
  medicalCenters,
  title,
  description,
  showAvailability = true,
  className,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "py-20 rounded-md relative flex items-center justify-center",
        className
      )}
      style={{
        backgroundColor: "rgba(15, 15, 15, 1)",
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    >
      <div
        className="w-3 h-3 rounded-full absolute shadow-[0_0_15px] shadow-current z-10 bg-current"
        style={{
          animation: `
            border-follow 6s linear infinite,
            color-change 6s linear infinite
          `,
        }}
      />
      <div
        className="absolute inset-0 rounded-md"
        style={{
          animation: "border-color-change 6s linear infinite",
        }}
      />

      <div className="relative z-20 text-center max-w-7xl">
        <h1 className="text-6xl font-bold">{title}</h1>
        {/* {description && (
          <p className="text-md mt-5 text-gray-300">{description}</p>
        )} */}

        {showAvailability && (
          <div className="available-now text-[#20bb5a] text-lg flex items-center justify-center mt-5">
            <div className="w-2 h-2 bg-[#20bb5a] rounded-full inline-block mr-2 animate-pulse shadow-[0_0_8px_#20bb5a]" />
            GAMCA MEDICAL CENTERS IN PAKISTAN
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {medicalCenters.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}
