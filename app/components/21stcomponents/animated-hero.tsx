import { Button } from "@/components/ui/button";
import { Link } from "@remix-run/react";
import { Company } from "Constant";
import { motion } from "framer-motion";
import { MessageCircle, MoveRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ButtonAppointment from "../ButtonAppointment";
import ButtonWhatsApp from "../ButtonWhatsApp";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["GAMCA", "Token", "Online", "Gulf", "Wafid", "Medical"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-blue-700 text-white dark:text-black pt-20">
      <div className="flex justify-around  mx-auto">
        <div className="flex gap-8 py-10 lg:py-10 items-center justify-center flex-col">
          <div>
            <Link to="/appointment">
              <Button variant="secondary" size="sm" className="gap-4">
                Book Your Appointment Now <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="lg:text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">
                GAMCA Appointment Center
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted max-w-2xl text-center">
              Fill Your Form | Pay Fee | Get Your Appointment | Check Medical
              Status and Report Online
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
            <ButtonAppointment />
            <ButtonWhatsApp />
          </div>
        </div>
        <div className="hidden md:flex md:justify-center items-center">
          <img
            className="rounded-xl shadow-xl"
            src="/book-appointment-pic.jpg"
            alt=""
            width={700}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
