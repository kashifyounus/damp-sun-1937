import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { auth } from "~/auth.server";
import { Form, Link, useActionData, useNavigate } from "@remix-run/react";
import { sessionStorage } from "~/utils/session.server";
import { useEffect, useState } from "react";
import { useToast } from "~/hooks/use-toast";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { cn } from "app c/lib/utils";
import { Loader2 } from "lucide-react";
import { checkUserExists } from "db/db.queries";

export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Token Login" },
    { name: "description", content: "GAMCA Token Login" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  let user = session.get("user");
  if (!user) return null;
  return redirect("/dashboard");
};

type LoginActionData = {
  success: boolean;
  redirectTo?: string;
  error?: string;
};
export const action: ActionFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  try {
    const user = await auth.authenticate("user-pass", request);
    console.log(user, "user");
    session.set("user", user);
    return new Response(null, {
      status: 302, // Redirect response status
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
        location: "/dashboard", // Redirect manually
      },
    });
  } catch (error: any) {
    return { success: false, error: error.message, status: 400 };
  }
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const actionData = useActionData<LoginActionData>();
  const { toast } = useToast();
  console.log(actionData, "actionData");

  useEffect(() => {
    if (actionData?.error) {
      setIsLoading(false); // Reset loading state when action data updates
      toast({
        title: "Authencation Error",
        description: actionData.error,
        color: "red",
      });
    }
  }, [actionData]);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form method="post" onSubmit={() => setIsLoading(true)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" /> Please
                        Wait...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
