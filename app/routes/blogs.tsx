import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BlogsList from "~/components/wordpress_headless/Blogs";
import { getWPBlogs } from "~/utils/wp.blogs";
import RootLayout from "./_layout";
import { Company } from "Constant";

export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Token Blog" },
    { name: "description", content: "GAMCA Token Blog" },
    {
      name: "keywords",
      content:
        "#wafidmedicalpakistan #wafidmedicalsliponline #gamcamedicalpakistan #wafid #gamcapakistan #wafidpakistan #dubaimedical #gamcamedical #gamcaappointment #wafidappointment #wafidmedical #saudiarabia🇸🇦 #gamcaislamabad #gamcamedicalappointment #gamcamedicalonline #Gamcalahore #gamcapeshawar #gamcamedicalcheck #gamcagujranwala #gamcakarachi #gamcamultan #gamcarawalpindi #Gamcamedicalstatus #GamcaMedicalfeesforsaudiarabia #GamcaMedicalfeesforuae #GamcaMedicalfeesforoman #saudiarabia #گیمکا #Gamca #gamcamedicalreport #omanmedical #muscatmedical #bahrainmedical #sudiamedical #kuwaitmedical #qatarmedical @gamcapakistanfee #gamcaappointment #wafidappointment #wafidreportchek #wafidonlinereport #wafidmedicalappointment #wafidpakistan",
    },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "google", content: "notranslate" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "Muhammad Saleem" },
    { name: "rating", content: "general" },
    { name: "distribution", content: "global" },
    { name: "revisit-after", content: "7 days" },
    { name: "language", content: "EN" },
    { name: "reply-to", content: Company.email },
    { name: "geo.placename", content: Company.address },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const blogs = await getWPBlogs(5);
  return new Response(JSON.stringify({ blogs }), { status: 200 });
};

const Blogs = () => {
  const { blogs } = JSON.parse(useLoaderData<typeof loader>());
  return (
    <RootLayout>
      <div className="mt-40">
        <BlogsList posts={blogs} />
      </div>
    </RootLayout>
  );
};

export default Blogs;
