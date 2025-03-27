import { useWPStore } from "~/context/configurationStore";
import { AnimatedHero } from "../21stcomponents/animated-hero";
import { GridBackground } from "../21stcomponents/glow-card";
import { CoverDemo } from "../acertinity/CoverDemo";
import ExaminationArea from "../ExaminationArea";
import { Separator } from "../ui/separator";
import BlogsList from "../wordpress_headless/Blogs";
import CountryCard from "./country-card";
import GAMCAProcess from "./GAMCAProcess";

export default function Home() {
  const { posts, countries, medicalCenters, pages } = useWPStore();
  return (
    <div className="min-h-screen bg-background">
        <div className="mt-10">
          <AnimatedHero />
        </div>

        <Separator />
        <CoverDemo />
        <div className="flex flex-col items-center justify-center w-full  mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-18 xl:px-72 py-10">
            {countries.map((country, index) => (
              <CountryCard key={index} country={country} className=" max-w-7xl" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center ">
          <div className="w-full ">
            <GridBackground
              className="text-white px-4 "
              title="Our Center Lists"
              description="GAMCA medical centers in pakistan"
              medicalCenters={medicalCenters}
            />
          </div>
        </div>

        <Separator />
        <GAMCAProcess />
        <Separator />
        <BlogsList posts={posts} pageTitle="Latest Blogs" loadMore={false} />
        <Separator />
        <ExaminationArea />
    </div>
  );
}
