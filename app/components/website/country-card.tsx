import { motion } from "framer-motion";
import ButtonAppointment from "../ButtonAppointment";
import ButtonWhatsApp from "../ButtonWhatsApp";
import { Card, CardContent } from "../ui/card";
import { cn } from "app c/lib/utils";

interface CountryCardProps {
  country: any;
  className?: string;
}

export default function CountryCard({ country, className }: CountryCardProps) {
  if (!country) {
    return null;
  }
  //console.log(country);
  const { featured_media } = country;
  //const flag = "";
  const flag =
    featured_media.media_details?.sizes?.full?.source_url || "/placeholder.svg";
  const name = country?.title.rendered ?? "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative group border-t-8 py-0.5 border-blue-400 rounded-xl"
    >
      <div className="absolute -inset-0.5  bg-gradient-to-r from-blue-400 to-blue-900 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <Card className="relative overflow-hidden backdrop-blur-sm bg-white/90 border-2 border-gray-100 ">
        <CardContent className="p-6">
          <div className="aspect-video relative mb-6 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
            <img
              src={flag}
              alt={`${name} flag`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {name}
          </h3>

          <div className="space-y-3">
            <ButtonAppointment className="w-full" />
            <ButtonWhatsApp className="w-full " />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
