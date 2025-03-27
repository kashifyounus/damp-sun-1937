// // app/models/appointment.server.ts

// import { db } from "db/database";
// import { appointments } from "db/schema";
// import { eq } from "drizzle-orm";

// export async function getAllAppointments() {
//   return await db.select().from(appointments);
// }
// // get appointment by ID
// export async function getAppointmentById(id: number) {
//   return await db
//     .select()
//     .from(appointments)
//     .where(eq(appointments.id, Number(id)))
//     .then((rows) => rows[0]);
// }
