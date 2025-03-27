import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const SingleBlog = ({ post }: { post: any }) => {
  const {
    title,
    content,
    excerpt,
    date,
    slug,
    author,
    category,
    featured_media,
  } = post;
  const featuredImage =
    featured_media.media_details?.sizes?.medium_large?.source_url ||
    "/placeholder.svg";

  //console.log(post);
  if (!post) {
    return null;
  }
  // Framer Motion variants for border animation
  const borderVariants = {
    hover: {
      scale: 1.05,
      borderColor: "#3B82F6", // Blue border color on hover
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.div
        className="flex flex-col items-center text-center p-2 border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer bg-w"
        whileHover="hover"
        variants={borderVariants}
      >
        <Card key={post.id.rendered} className="overflow-hidden  min-h-[460px]">
          <div className="relative aspect-video">
            <img
              src={featuredImage}
              alt={post.title.rendered}
              className="contain w-full h-full"
            />
          </div>
          <CardHeader className="p-4 pb-2">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {post.categories.name}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {moment(post.date).format("MMM DD, YYYY")}
              </span>
            </div>
            <h3 className="line-clamp-2 text-xl font-bold">
              <Link
                to={`/blog/${post.id}/${post.slug}`}
                className="hover:underline"
              >
                {post.title.rendered}
              </Link>
            </h3>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div
              className="line-clamp-3 text-sm text-muted-foreground text-justify"
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            ></div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{post.author.name}</span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
};

export default SingleBlog;
