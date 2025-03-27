import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { AppSidebar } from "~/components/AppSidebar";
import { ModeToggle } from "~/components/ModeToggle";
import { Separator } from "~/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { sessionStorage } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  let user = session.get("user");
  if (!user) throw redirect("/login");
  return null;
};

export default function DashboardLayout() {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <main className="w-full">
        <header className="flex sticky  bg-blue-700 top-0 h-16 shrink-0 items-center gap-2 border-b px-4 ">
          <SidebarTrigger className="dark:bg-sidebar bg-slate-200" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* <Breadcrumb className="text-sidebar-foreground">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sidebar-foreground">
                Data Fetching
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
          <div className="ml-auto px-3">
            <div className="flex items-center gap-2"> <ModeToggle /></div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
