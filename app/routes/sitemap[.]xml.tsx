import { type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const websiteUrl = "https://gamcatoken.online/"; // Change this to your actual domain

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${websiteUrl}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${websiteUrl}/about</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${websiteUrl}/contact</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${websiteUrl}/privacy-policy</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
