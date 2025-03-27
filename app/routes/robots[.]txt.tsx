import { type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return new Response(
    `User-agent: *
     Disallow: /admin
     Disallow: /private
     Allow: /
     Sitemap: https://gamcatoken.online/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
};
