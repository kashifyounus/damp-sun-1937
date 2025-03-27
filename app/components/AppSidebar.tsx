import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@remix-run/react";
import { Company } from "Constant";
import { ImBlogger2, ImHome } from "react-icons/im";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: ImHome,
  },
  {
    title: "Articles",
    url: "/dashboard/posts",
    icon: ImBlogger2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar" className="">
      <SidebarHeader className="border-b bg-blue-700 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {/* <Command className="size-4 bg-white" /> */}
                  <img src="/logo1.jpg" className="w-8 h-8" alt="logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{Company.name}</span>
                  <span className="truncate text-xs">Online Appointments</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-blue-700 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">MENUS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="border-black border bg-black rounded-lg"
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
