import "@fontsource/poppins";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import { useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import { useWPStore } from "./context/configurationStore";
import useGoogleTagManager from "./hooks/useGoogleTagManager";
import styles from "./tailwind.css?url";
import { getCustomPosts, getWPBlogs, getWPPages } from "./utils/wp.blogs";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  { rel: "stylesheet", href: styles },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
export const loader: LoaderFunction = async ({ request }) => {
  const blogs = await getWPBlogs(5);
  const countries = await getCustomPosts("countries");
  const medicalcenters = await getCustomPosts("medicalcenters");
  const pages = await getWPPages();
  const obj = { blogs, countries, medicalcenters, pages };
  return new Response(JSON.stringify(obj), { status: 200 });
};

export function Layout({ children }: { children: React.ReactNode }) {
  useGoogleTagManager();
  const { blogs, countries, medicalcenters, pages } = JSON.parse(
    useLoaderData<typeof loader>()
  );
  const setPosts = useWPStore((state) => state.setPosts);
  const setCountries = useWPStore((state) => state.setCountries);
  const setMedicalCenters = useWPStore((state) => state.setMedicalCenters);
  const setCountryNames = useWPStore((state) => state.setCountryNames);
  const setPages = useWPStore((state) => state.setPages);
  const setMedicalCenterNames = useWPStore(
    (state) => state.setMedicalCenterNames
  );
  const error = useRouteError();
  useEffect(() => {1
    //console.log("root.Layout");
    if (countries) {
      const _countryNames = countries?.map(
        (country: any) => country?.title?.rendered
      );
      //console.log(_countryNames);
      setCountryNames(_countryNames);
    }
    if (medicalcenters) {
      const _medicalCenterNames = medicalcenters?.map(
        (country: any) => country?.title?.rendered
      );
      //console.log(_medicalCenterNames);
      setMedicalCenterNames(_medicalCenterNames);
    }

    setPages(pages);
    setPosts(blogs);
    setCountries(countries);
    setMedicalCenters(medicalcenters);
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WK5TTRZD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Meta />
        <Links />
      </head>
      <body>
      <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : ""}
        </h1>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
