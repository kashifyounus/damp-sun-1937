import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import axios from "axios";
import { appointmentSchema } from "db/appointmentSchema";

// Mock database (replace with actual database logic)
// Simulated database (for now)
//let appointments: any[] = [];
// 🔹 GET API to fetch all appointments
export const loader: LoaderFunction = async () => {
  return new Response(JSON.stringify({ appointmentSchema }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// 🔹 POST API to create a new appointment
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
   
    const body = await request.json();
    //const { email } = body;

    // Validate input using Zod schema
    const validatedData = appointmentSchema.safeParse(body);
    if (!validatedData.success) {
      console.log("Validation error: ", validatedData.error.format());
      return new Response(
        JSON.stringify({ error: validatedData.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const { data } = validatedData;
    const myNewAppointment = {
      ...data,
      dateOfBirth: data.dateOfBirth.toISOString().split("T")[0], // Converts to 'YYYY-MM-DD'
      passportIssueDate: data.passportIssueDate.toISOString().split("T")[0],
      passportExpiryDate: data.passportExpiryDate.toISOString().split("T")[0],
    };

    /**
     *   country: "Pakistan",
      city: "Karachi",
      countryTravellingTo: "UAE Dubai",
      firstName: "Kashif",
      lastName: "Younus",
      gender: "Male",
      maritalStatus: "Married",
      dateOfBirth: "1990-01-01",
      nationality: "Pakistan",
      passportNumber: "123456789",
      passportIssueDate: "2020-01-01",
      passportExpiryDate: "2030-01-01",
      passportIssuePlace: "Karachi",
      visaType: "Work Visa",
      email: "kashif@gmail.com",
      phone: "4968746343",
      nationalId: "65465465",
      positionAppliedFor: "Doctor",
      otherPosition: "",
      informationAccurate: true,

      // Payment Fields
      paymentMethod: "JazzCash",
      trxID: "TRX123456",
      paymentScreenshot: "https://example.com/screenshot.jpg",
     * 
     */
    const appointmentData = {
      country: data.country,
      city: data.city,
      country_travelling_to: data.countryTravellingTo,
      first_name: data.firstName,
      last_name: data.lastName,
      date_of_birth: data.dateOfBirth,
      nationality: data.nationality,
      gender: data.gender,
      marital_status: data.maritalStatus,
      passport_number: data.passportNumber,
      passport_issue_date: data.passportIssueDate,
      passport_expiry_date: data.passportExpiryDate,
      passport_issue_place: data.passportIssuePlace,
      visa_type: data.visaType,
      email: data.email,
      phone: data.phone,
      national_id: data.nationalId,
      position_applied_for: data.positionAppliedFor,
      other_position: data.otherPosition,
      information_accurate: data.informationAccurate,
      payment_method: data.paymentMethod,
      trx_id: data.trxID,
      payment_screenshot: data.paymentScreenshot,
    };
    //console.log("New Appointment: ", myNewAppointment);

    //const WORDPRESS_URL = "https://wp.gamcatoken.online/wp-json/wp/v2/posts";
    //const USERNAME = "admin";
    //const APP_PASSWORD = "weV0 2iQF UAgk wN66 xqSN cctD"; // Your application password

    const APPOINTMENT_URL = process.env.WP_BASE_URL! + "/wp-json/wp-appointment/v1/book/";
     // "https://wp.gamcatoken.online/wp-json/wp-appointment/v1/book/";
    const response = await axios.post(APPOINTMENT_URL, appointmentData, {
      headers: {
        Authorization: `Basic ${btoa(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`)}`,
        "Content-Type": "application/json",
      },
    });
    const { status } = response;
    console.log("Response.status: ", status);
    console.log("Response.Response: ", response.data);
    return new Response(
      JSON.stringify({
        message: "Appointment booked successfully!",
        //appointment: newAppointment,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    handleAxiosError(error);
    return new Response(
      JSON.stringify({
        error: error?.response?.data?.message || "Internal Server Error",
        devMessage: error.response.data.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

/*
 try {
    const body = await request.json();
    const { email } = body;
    // Check if user exists
    console.log("Checking if user exists...");
    const userExists = await checkEmailExists(email);
    console.log("User exists: ", email+ " "+ userExists);
    if (userExists) {
      console.log("Email already registered, try another email address.");
      return new Response(
        JSON.stringify({
          error: "Email already registered, try another email address.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate input using Zod schema
    const validatedData = insertAppointmentSchema.safeParse(body);
    if (!validatedData.success) {
      console.log("Validation error: ", validatedData.error.format());
      return new Response(
        JSON.stringify({ error: validatedData.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const { data } = validatedData;
    const myNewAppointment = {
      ...data,
      dateOfBirth: data.dateOfBirth.toISOString().split("T")[0], // Converts to 'YYYY-MM-DD'
      passportIssueDate: data.passportIssueDate.toISOString().split("T")[0],
      passportExpiryDate: data.passportExpiryDate.toISOString().split("T")[0],
    };

    // Insert into database
    const newAppointment = await db
      .insert(appointments)
      .values(myNewAppointment)
      .returning();

    return new Response(
      JSON.stringify({
        message: "Appointment booked successfully!",
        appointment: newAppointment,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating appointment ", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", devMessage: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

*/

function handleAxiosError(error: any) {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.message);
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response data:", error.response.data.message);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Other errors (network issues, etc.)
      console.error("Error setting up request:", error.message);
    }
  } else {
    console.error("Unexpected error:", error);
  }
}
