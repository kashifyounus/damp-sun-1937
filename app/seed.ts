import bcrypt from "bcryptjs";
import { db } from "../db/database"; // Ensure your Drizzle setup is correct
import { users } from "../db/schema"; // Import your users table schema

// Function to seed a test user

export const seed = async () => {
  const email = "zainwho@gmail.com";
  const password = "Zain@179211";
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  await db.insert(users).values({
    email,
    passwordHash: hashedPassword,
  });

  console.log("✅ Test user created:", { email, password });
};

seed()
  .then(() => {
    console.log("🌱 Seeding completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
