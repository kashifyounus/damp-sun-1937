import { useLoaderData } from "@remix-run/react";
import { getSinglePost, getWPBlogs } from "~/utils/wp.blogs";
import RootLayout from "./_layout";
import { MetaFunction } from "@remix-run/node";
import { Company } from "Constant";
import { Avatar } from "~/components/ui/avatar";
import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import moment from "moment";

export const meta: MetaFunction = ({ data }: { data: any }) => {
  console.log('meta data', data)

  const {
    singlePost
  } = data;
  const {
    title, content, excerpt, date, author, categories, tags
  } = singlePost;
  ////console.log(data);
  return [
    { title:  title?.rendered },
    { name: "description", content: data?.excerpt?.rendered },
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

export const loader = async ({ params }: { params: { id: number } }) => {
  const singlePost = await getSinglePost(params.id);
  const recentPosts = await getWPBlogs(5);
  return { singlePost, recentPosts };
};

const SinglePost = () => {
  const { singlePost, recentPosts } = useLoaderData<typeof loader>();

  const { title, content, excerpt, date, author, categories, tags } =
    singlePost;
  const { name, avatar } = author;
  console.log(singlePost);
  console.log(author);

  const featuredImage = singlePost.featured_media?.source_url;
  const authorAvatar = author.avatar_urls?.["96"];
  return (
    <RootLayout>
      <div className="container mx-auto my-40">
        <div id="webcrumbs">
          <div className="w-full max-w-[800px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl">
            <div className="relative">
              <img
                src={featuredImage}
                alt="Blog Post Header"
                className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-3 mb-2">
                
                  <span className="bg-neutral-100 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 hover:bg-neutral-200 cursor-pointer">
                   {categories?.name}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {title?.rendered}
                </h1>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={authorAvatar}
                    alt="Author"
                    className="w-12 h-12 rounded-full border-2 border-primary-100"
                  />
                  <div>
                    <h3 className="font-medium">{author.name}</h3>
                    <p className="text-sm text-neutral-500">
                      {author.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center text-neutral-500 text-sm gap-2">
                  {/* <span className="material-symbols-outlined mr-1 text-primary-500">
                    calendar_today
                  </span> */}
                  <span>{moment(date).format("MMMM D, YYYY")}</span>
                  <span className="mx-2">•</span>
                  {/* <span className="material-symbols-outlined mr-1 text-primary-500">
                    schedule
                  </span> */}
                  <span>8 min read</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <div
                  className="text-ellipsis text-neutral-700 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: content?.rendered }}
                />
                {/* <p className="text-neutral-700 leading-relaxed mb-4">
                  The web development landscape is constantly evolving with new
                  technologies, frameworks, and methodologies emerging at a
                  rapid pace. As we move further into 2023, several key trends
                  are shaping the future of how we build and interact with web
                  applications.
                </p>

                <p className="text-neutral-700 leading-relaxed mb-6">
                  From the rise of AI-assisted development tools to the growing
                  importance of web performance optimization, developers have a
                  lot to keep up with. In this article, we'll explore the most
                  significant trends that are transforming the industry and how
                  you can prepare for them.
                </p> */}

                {/* <h2 className="text-xl font-bold mb-3">Recent Blogs</h2> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 transition-all duration-300 hover:shadow-md hover:border-primary-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary-500">
                        auto_awesome
                      </span>
                      <h3 className="font-semibold">AI-Assisted Development</h3>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Tools like GitHub Copilot and ChatGPT are transforming how
                      developers write and debug code, increasing productivity
                      dramatically.
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 transition-all duration-300 hover:shadow-md hover:border-primary-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary-500">
                        speed
                      </span>
                      <h3 className="font-semibold">Web Performance</h3>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Core Web Vitals and user-centric performance metrics
                      continue to be crucial for SEO and user experience.
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 transition-all duration-300 hover:shadow-md hover:border-primary-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary-500">
                        devices
                      </span>
                      <h3 className="font-semibold">Progressive Web Apps</h3>
                    </div>
                    <p className="text-sm text-neutral-600">
                      PWAs continue to bridge the gap between web and native
                      applications, offering offline functionality and app-like
                      experiences.
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 transition-all duration-300 hover:shadow-md hover:border-primary-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary-500">
                        data_object
                      </span>
                      <h3 className="font-semibold">WebAssembly</h3>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Enabling high-performance applications in the browser,
                      WebAssembly is expanding what's possible on the web.
                    </p>
                  </div>
                </div> */}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100">
                <div className="flex justify-between items-center">
                  {/* <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-start">
                    <button className="flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-200 transition-all duration-300 hover:bg-neutral-50 hover:border-primary-300">
                      <span className="material-symbols-outlined text-sm">
                        thumb_up
                      </span>
                      <span className="text-sm">128</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-200 transition-all duration-300 hover:bg-neutral-50 hover:border-primary-300">
                      <span className="material-symbols-outlined text-sm">
                        comment
                      </span>
                      <span className="text-sm">42</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-200 transition-all duration-300 hover:bg-neutral-50 hover:border-primary-300">
                      <span className="material-symbols-outlined text-sm">
                        bookmark
                      </span>
                      <span className="text-sm">Save</span>
                    </button>
                  </div> */}

                  {/* <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-start mt-4 sm:mt-0">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 transition-all duration-300 hover:bg-primary-100">
                      <i className="fa-brands fa-twitter text-primary-600"></i>
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 transition-all duration-300 hover:bg-primary-100">
                      <i className="fa-brands fa-facebook text-primary-600"></i>
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 transition-all duration-300 hover:bg-primary-100">
                      <i className="fa-brands fa-linkedin text-primary-600"></i>
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 transition-all duration-300 hover:bg-primary-100">
                      <span className="material-symbols-outlined text-primary-600">
                        link
                      </span>
                    </button>
                  </div> */}
                </div>
                {/* Next: "Add related articles section" */}
                {/* Next: "Add author bio with social links" */}
                {/* Next: "Add comments section" */}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default SinglePost;
