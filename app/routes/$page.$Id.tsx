import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useEffect } from "react";
import RootLayout from "./_layout";
import { useWPStore } from "~/context/configurationStore";
import { getWPPages } from "~/utils/wp.blogs";
import axios from "axios";

// export const loader: LoaderFunction = async ({ request }) => {
//   const url = new URL(request.url);
//   const pageId = url.searchParams.get("pageId");
//   return { pageId };
// };

export const loader = async ({
  params,
}: {
  params: { page: string; Id: number };
}) => {
  const pageId = params.Id;
  console.log(pageId);
  //const page = getWPPages(pageId);
  //console.log(page);
  return { pageId };
};

const WPPage = () => {
  const { pageId } = useLoaderData<typeof loader>();
  const { pages } = useWPStore();
  const page = pages.find((page) => page.id == pageId);
  //console.log(pages);
  console.log(page?.link);
  console.log(pageId);
  //console.log(pages);
  if (!page) {
    return null;
  }
  useEffect(() => {
    const fetchPage = async () => {
      const response = await axios.get(page.link);
      const html = response.data;
      //const doc = new DOMParser().parseFromString(html, "text/html");
      // const styleTags = doc.head.querySelectorAll("style");
      // styleTags.forEach((style) => {
      //   document.head.appendChild(style.cloneNode(true)); // Append WP styles to React
      // });
    };
    try {
      fetchPage();
    } catch (error) {
      console.log("Error fetching pages:", error);
    }
  }, []);
  return (
    <RootLayout>
      <div className="container mx-auto mt-40">
        {page?.title?.rendered} {pageId}
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        ></div>
      </div>
    </RootLayout>
  );
};

export default WPPage;
