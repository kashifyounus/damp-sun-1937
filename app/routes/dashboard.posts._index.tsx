// import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
// import { Link, useLoaderData } from "@remix-run/react";
// import { db } from "db/database";
// import { posts } from "db/schema";
// import { eq } from "drizzle-orm";
// import moment from "moment";
// import { Button } from "~/components/ui/button";
// import { Separator } from "~/components/ui/separator";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "Posts" },
//     { name: "description", content: "Read the latest articles from our blog." },
//   ];
// };

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   // const postList = await db
//   //   .select()
//   //   .from(posts)
//   //   .where(eq(posts.published, true));
//   const url = new URL(request.url);
//   const page = Number(url.searchParams.get("page") || 1);
//   const pageSize = 10;

//   const postList = await db
//     .select()
//     .from(posts)
//     .where(eq(posts.published, true))
//     .limit(pageSize)
//     .offset((page - 1) * pageSize);
//   return { posts: postList };
// };

// const Posts = () => {
//   const { posts } = useLoaderData<typeof loader>();
//   return (
//     <div className="max-w-4xl mx-auto py-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold my-4">Articles</h1>
//         <Link to="/dashboard/post/new" className="text-blue-600">
//           <Button variant="outline">Add New</Button>
//         </Link>
//       </div>
//       <Separator className="mb-4 shadow-xl" />
//       {posts.map((post) => (
//         <div key={post.id} className="border-b py-4">
//           <Link
//             to={`/dashboard/post/${post.slug}`}
//             className="text-xl font-semibold text-blue-600"
//           >
//             {post.title}
//           </Link>
//           <p className="text-gray-600 text-sm">
//             {moment(post.createdAt).format("MM DD, YYYY")}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Posts;
