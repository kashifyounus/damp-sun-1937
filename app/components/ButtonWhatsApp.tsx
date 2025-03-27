import { Company } from "Constant";
import { MessageCircleMore } from "lucide-react";
import { cn } from "app c/lib/utils";
import { Button } from "./ui/button";
import { Link } from "@remix-run/react";
import { ImWhatsapp } from "react-icons/im";

const ButtonWhatsApp = ({ className }: { className?: string }) => {
  return (
    <Link to={`https://wa.me/${Company.whatsApp}`} target="_blank" className=" flex items-center justify-center gap-2">
      <Button
        size={"lg"}
        className={cn(
          "bg-green-600 hover:bg-green-900 text-white transform hover:scale-105 transition-transform duration-200",
          className
        )}
      >
        Appointment On WhatsApp
        <ImWhatsapp />
      </Button>
    </Link>
  );
};

export default ButtonWhatsApp;
