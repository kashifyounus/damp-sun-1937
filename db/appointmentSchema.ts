import { z } from "zod";

export const appointmentSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name  is required"),
    nationality: z.string().min(2, "Nationality is required"),
    gender: z.string().min(1, "Gender is required"),
    maritalStatus: z.string().min(1, "Marital status is required"),
    country: z.string().min(2, "Country is required"),
    city: z.string().min(2, "City is required"),
    countryTravellingTo: z.string().min(2, "Country travelling to is required"),
    passportIssuePlace: z.string().min(2, "Passport issue place is required"),
    visaType: z.string().min(2, "Visa type is required"),
    nationalId: z.string().min(2, "National ID is required"),
    positionAppliedFor: z.string().min(2, "Position applied for is required"),
    informationAccurate: z.boolean().transform((val) => !!val),
    paymentMethod: z.string().min(2, "Payment method is required"),
    trxID: z.string().min(2, "Transaction ID is required"),
    paymentScreenshot: z.string().optional(),
    otherPosition: z.string().optional(),
    phone: z.string().min(2, "Phone number is required"),
    // Passport Information
    passportNumber: z
      .string()
      .length(9, "Passport number must be exactly 9 characters"),
    email: z.string().email("Invalid email format"),
    dateOfBirth: z.string().transform((str) => new Date(str)),
    passportIssueDate: z.string().transform((str) => new Date(str)),
    passportExpiryDate: z.string().transform((str) => new Date(str)),
  });
