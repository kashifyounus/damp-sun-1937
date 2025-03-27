// app/components/AppointmentDetails.tsx
import React from "react";

interface Appointment {
  id: number;
  country: string;
  city: string;
  countryTravellingTo: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  gender: string;
  maritalStatus: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssuePlace: string;
  visaType: string;
  email: string;
  phone: string;
  nationalId: string;
  positionAppliedFor: string;
  otherPosition: string;
  informationAccurate: boolean;
  paymentMethod: string;
  trxID: string;
  paymentScreenshot: string;
}

interface AppointmentDetailsProps {
  appointment: Appointment;
}

export function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Location Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DetailItem label="Country" value={appointment.country} />
        <DetailItem label="City" value={appointment.city} />
        <DetailItem
          label="Country Travelling To"
          value={appointment.countryTravellingTo}
        />
      </div>

      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DetailItem label="First Name" value={appointment.firstName} />
        <DetailItem label="Last Name" value={appointment.lastName} />
        <DetailItem label="Date of Birth" value={appointment.dateOfBirth} />
        <DetailItem label="Nationality" value={appointment.nationality} />
        <DetailItem label="Gender" value={appointment.gender} />
        <DetailItem label="Marital Status" value={appointment.maritalStatus} />
      </div>

      <h2 className="text-xl font-bold mb-4">Passport Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DetailItem
          label="Passport Number"
          value={appointment.passportNumber}
        />
        <DetailItem
          label="Passport Issue Date"
          value={appointment.passportIssueDate}
        />
        <DetailItem
          label="Passport Expiry Date"
          value={appointment.passportExpiryDate}
        />
        <DetailItem
          label="Passport Issue Place"
          value={appointment.passportIssuePlace}
        />
        <DetailItem label="Visa Type" value={appointment.visaType} />
      </div>

      <h2 className="text-xl font-bold mb-4">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DetailItem label="Email" value={appointment.email} />
        <DetailItem label="Phone" value={appointment.phone} />
        <DetailItem label="National ID" value={appointment.nationalId} />
      </div>

      <h2 className="text-xl font-bold mb-4">Job Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DetailItem
          label="Position Applied For"
          value={appointment.positionAppliedFor}
        />
        <DetailItem label="Other Position" value={appointment.otherPosition} />
      </div>

      <h2 className="text-xl font-bold mb-4">Payment Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DetailItem label="Payment Method" value={appointment.paymentMethod} />
        <DetailItem label="Transaction ID" value={appointment.trxID} />
        {appointment.paymentScreenshot && (
          <DetailItem
            label="Payment Screenshot"
            value={
              <img
                src={appointment.paymentScreenshot}
                alt="Payment Screenshot"
                className="w-32 h-32 object-cover"
              />
            }
          />
        )}
      </div>

      {/* <h2 className="text-xl font-bold mb-4">Confirmation</h2>
      <div className="mb-6">
        <DetailItem
          label="Information Accurate"
          value={appointment.informationAccurate ? "Yes" : "No"}
        />
      </div> */}
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string | React.ReactNode;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-lg font-medium">{value}</span>
    </div>
  );
}
