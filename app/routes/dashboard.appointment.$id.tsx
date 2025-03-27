import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AppointmentDetails } from "~/components/AppointmentDetails";
import { getAppointmentById } from "~/models/appointment.server";
import { sessionStorage } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log("🔒 Checking if user is authenticated... on server side");
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  let user = session.get("user");
  if (!user) throw redirect("/login");
  // Extract the ID from the URL parameters
  const { id } = params;
  console.log("id parameters", id);

  if (!id) {
    throw new Response("ID is required", { status: 400 });
  }
  const appointment = await getAppointmentById(Number(id));
  if (!appointment) {
    throw new Response("Appointment not found", { status: 404 });
  }
  return { appointment };
};

const AppointmentDetailPage = () => {
  const { appointment } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end items-center mb-6">
        <Link
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6 border-t-4 border-blue-700 rounded-xl p-4">
        Appointment Details
      </h1>
      <AppointmentDetails appointment={appointment} />
    </div>
  );
};

export default AppointmentDetailPage;
