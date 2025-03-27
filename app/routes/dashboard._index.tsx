import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AppointmentsDataTable } from "~/components/AppointmentsDataTable";
import { getAllAppointments } from "~/models/appointment.server";
import { sessionStorage } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Admin Dashobard" },
    { name: "description", content: "GAMCA Admin Dashobard" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  console.log("🔒 Checking if user is authenticated... on server side");
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  let user = session.get("user");
  if (!user) throw redirect("/login");
  const appointments = await getAllAppointments();
  return { appointments };
};

export default function Dashboard() {
  const { appointments } = useLoaderData<typeof loader>();
  //console.log(appointments);
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <div>
        <div>
          <AppointmentsDataTable data={appointments} />
        </div>
      </div>
    </div>
  );
}
