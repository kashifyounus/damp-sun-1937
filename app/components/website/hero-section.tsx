import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react/icons";
import { Company } from "Constant";
import { Link } from "@remix-run/react";

const slides = [
  {
    title: `${Company.name.toUpperCase()} APPOINTMENT OR TOKEN`,
    description: `${Company.name} and Wafid medical Appointments office in Pakistan`,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1932&auto=format&fit=crop&q=80auto=format&fit=crop&q=80",
  },
  {
    title: "Expert Medical Care",
    description: "Our team of specialists is dedicated to providing you with the best healthcare services.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
  },
  {
    title: "Modern Healthcare Facilities",
    description: "State-of-the-art equipment and facilities for comprehensive medical treatment.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
  },
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  return (
    <section className="relative h-[75vh] lg:h-[590px] overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] relative min-w-0">
              <div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.3)"
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 h-full flex items-center"
              >
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                      {slide.description}
                    </p>
                    <Link to="/appointment" ><Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Book Appointment
                    </Button></Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}