// app/components/StepsProgress.tsx
import React from "react";

interface StepsProgressProps {
  steps: string[];
  currentStep: number;
}

export function StepsProgress({ steps, currentStep }: StepsProgressProps) {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full space-y-4 mb-8 bg-white p-4 rounded-lg shadow-md">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-700 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={` ${
              index + 1 <= currentStep ? "text-blue-700" : "text-gray-500"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}