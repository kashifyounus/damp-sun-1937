import { createCookieSessionStorage } from "@remix-run/node";

// Create session storage
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    secrets: [process.env.SESSION_SECRET || "default_secret"],
  },
});

// Get session from request
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

// Commit session (save changes)
export async function commitSession(session: any) {
  return sessionStorage.commitSession(session);
}

// Destroy session (logout)
export async function destroySession(session: any) {
  return sessionStorage.destroySession(session);
}
