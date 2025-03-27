// import { Authenticator } from "remix-auth";
// import { FormStrategy } from "remix-auth-form";
// import { db } from "../db/database";
// import { User, users } from "../db/schema";
// import bcrypt from "bcryptjs";
// import { eq } from "drizzle-orm";
// import { toast } from "sonner";

// //export const auth = new Authenticator();
// export const auth = new Authenticator<User>();

// // Tell the Authenticator to use the form strategy
// auth.use(
//   new FormStrategy(async ({ form }) => {
//     const email = form.get("email")?.toString();
//     const password = form.get("password")?.toString();
//     if (!email || !password) throw new Error("Invalid email/password");
//     const user = await db.query.users.findFirst({
//       where: eq(users.email, email),
//     });
//     if (!user) {
//       throw new Error("Invalid credentials");
//     }
//     if (!bcrypt.compareSync(password, user.passwordHash)) {
//       console.log(password, "Invalid password");
//       throw new Error("Invalid password");
//     }
    
//     return user;
//   }),
//   "user-pass"
// );

// // ✅ Protect Routes
// export async function requireUserId(request: Request) {
//   console.log("🔒 Checking if user is authenticated... on server side");
//   console.log(request, "request");
//   return auth.authenticate("user-pass", request);
// }
