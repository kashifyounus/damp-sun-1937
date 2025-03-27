import React from "react";
import { Button } from "./ui/button";
import { Link } from "@remix-run/react";
import { cn } from "app c/lib/utils";

const ButtonAppointment = ({
  className,
  props,
}: {
  className?: string;
  props?: any;
}) => {
  return (
    <Link to="/appointment" className=" flex items-center justify-center gap-2">
      <Button
        size="lg"
        className={cn(
          " bg-yellow-400 text-black hover:text-white transform hover:scale-105 transition-transform duration-200",
          className
        )}
        {...props}
      >
        Book Appointment
      </Button>
    </Link>
  );
};

export default ButtonAppointment;
