import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { MoonIcon, SunIcon, User2Icon } from "lucide-react";

export function ModeToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <User2Icon className="shadow-lg border border-black rounded-full" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {}}></DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/">Home Page</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <form action="/logout" method="post">
            <button type="submit">Logout</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
