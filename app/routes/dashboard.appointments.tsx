import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AppointmentsTable } from "~/components/AppointmentsTable";
import { getAllAppointments } from "~/models/appointment.server";
import { sessionStorage } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  console.log("🔒 Checking if user is authenticated... on server side");
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  let user = session.get("user");
  if (!user) throw redirect("/login");
  const appointments = await getAllAppointments();
  return { appointments };
};

const Appointments = () => {
  const { appointments } = useLoaderData<typeof loader>();
  console.log(appointments);
  return (
    <div>
      <h1>Appointments</h1>
      <AppointmentsTable data={appointments} />
    </div>
  );
};

export default Appointments;
