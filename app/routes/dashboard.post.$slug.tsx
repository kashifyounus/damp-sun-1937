// import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
// import { Link, useLoaderData } from "@remix-run/react";
// import { db } from "db/database";
// import { posts } from "db/schema";
// import { eq } from "drizzle-orm";
// import moment from "moment";

// export const meta: MetaFunction = ({
//   data,
// }: {
//   data: {
//     post: { title: string; slug: string; createdAt: string; content: string };
//   };
// }) => {
//   if (!data) {
//     return [
//       { title: "GAMCAToken Admin Dashobard" },
//       { name: "description", content: "GAMCAToken Admin Dashobard" },
//     ];
//   }
//   return [
//     { title: data?.post.title },
//     { name: "description", content: data?.post.slug },
//     { "og:title": data?.post.title },
//     { "og:description": data?.post.slug },
//     { "twitter:title": data?.post.title },
//     { "twitter:description": data?.post.slug },
//     { "og:image": data?.post.slug },
//     { "twitter:image": data?.post.slug },
//     {
//       "twitter:description":
//         data.post.content || data.post.content.slice(0, 150),
//     },
//   ];
// };

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   const post = await db
//     .select()
//     .from(posts)
//     .where(eq(posts.slug, params.slug))
//     .limit(1);

//   if (!post.length) throw new Response("Post Not Found", { status: 404 });

//   return { post: post[0] };
// };

// export default function BlogPost() {
//   const { post } = useLoaderData<typeof loader>();

//   return (
//     <article className="max-w-3xl mx-auto py-6">
//       <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
//       <Link to="/dashboard/posts" className="text-blue-600">
//         Back to Posts
//       </Link>
//       <p className="text-gray-500 text-sm">
//         {moment(post.createdAt).format("MM DD, YYYY")}
//       </p>
//       <div
//         className="mt-6 prose"
//         dangerouslySetInnerHTML={{ __html: post.content }}
//       />
//     </article>
//   );
// }
