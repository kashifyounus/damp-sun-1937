import { ActionFunction } from "@remix-run/node";
import axios from "axios";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const APPOINTMENT_URL =
      process.env.WP_BASE_URL! + "/wp-json/wp-appointment/v1/uploadScreenShot/";
    const response = await axios.post(APPOINTMENT_URL, formData, {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`
        )}`,
        "Content-Type": "application/json",
      },
    });
    const { status, data } = response;
    console.log("Response.data: ", data);
    console.log("Response.status: ", status);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
