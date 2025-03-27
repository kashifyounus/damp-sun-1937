// // routes/admin/new-post.tsx
// import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
// import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { db } from "db/database";
// import { posts } from "db/schema";
// import { useEffect, useState } from "react";
// import { Alert } from "~/components/ui/alert";
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";
// import { Separator } from "~/components/ui/separator";
// import { useToast } from "~/hooks/use-toast";
// import { generateSlug } from "~/utils/slugify";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Post - Gamca Token" },
//     { name: "description", content: "Write a new post" },
//     { name: "viewport", content: "width=device-width, initial-scale=1" },
//   ];
// };

// type PostActionData = {
//   success: boolean;
//   message?: string;
//   error?: string;
// };

// export const action = async ({ request }: ActionFunctionArgs) => {
//   try {
//     const formData = await request.formData();
//     const title = formData.get("title") as string;
//     //const slug = formData.get("slug") as string;
//     const slug = generateSlug(title);
//     const content = formData.get("content") as string;

//     const result = await db
//       .insert(posts)
//       .values({ title, slug, content, published: true });
//     console.log(result);
//     // return success message
//     return {
//       success: true,
//       message: "Post created successfully",
//     };

//     //return redirect("/dashboard/posts");
//   } catch (e) {
//     console.log(e);
//     // throw error if something goes wrong
//     return new Response("Bad Request", { status: 400 });
//   }
// };

// export default function NewPost() {
//   // get data from action
//   const actionData = useActionData<PostActionData>();
//   console.log("action data found", actionData);

//   const [isClient, setIsClient] = useState(false);
//   const { toast } = useToast();

//   if (actionData?.success) {
//     toast({
//       title: "Success",
//       description: actionData.message,
//       color: "green",
//       duration: 5000,
//     });
//   }

//   useEffect(() => {
//     setIsClient(true);
//   }, []);
//   const navigation = useNavigation();
//   const [content, setContent] = useState("");

//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "",
//     onUpdate: ({ editor }) => setContent(editor.getHTML()),
//   });

//   if (!isClient) return null; // Prevent SSR rendering

//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold my-4">New Post</h1>
//         <Link to="/dashboard/posts" className="text-blue-600">
//           <Button variant="outline" className="">
//             {" "}
//             Back to Posts
//           </Button>
//         </Link>
//       </div>
//       <Separator className="mb-4 shadow-xl" />
//       <Form method="post">
//         <Label>Title</Label>
//         <Input
//           type="text"
//           name="title"
//           required
//           className="border p-2 w-full mb-4 bg-gray-100"
//         />
//         {/* <Label>Slug</Label>
//         <Input
//           type="text"
//           name="slug"
//           required
//           className="border p-2 w-full mb-4 bg-gray-100"
//         /> */}

//         <Label>Content</Label>
//         <EditorContent
//           editor={editor}
//           className="border p-2 w-full min-h-[150px] bg-gray-100"
//         />
//         <input type="hidden" name="content" value={content} />

//         <Button
//           type="submit"
//           className="mt-4 bg-blue-600 text-white p-2 rounded"
//           disabled={navigation.state !== "idle"}
//         >
//           {navigation.state === "submitting" ? "Saving..." : "Submit"}
//         </Button>
//       </Form>
//     </div>
//   );
// }
// export function Editor({
//   content,
//   onChange,
// }: {
//   content: string;
//   onChange: (content: string) => void;
// }) {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const editor = useEditor({
//     extensions: [StarterKit],
//     content,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//   });

//   if (!isClient) return null; // Prevent SSR rendering

//   return <EditorContent editor={editor} />;
// }
