import React from "react";
import { Badge } from "../ui/badge";
import { Link } from "@remix-run/react";
import { ArrowRightIcon, CalendarIcon, Clock3Icon } from "lucide-react";
import { Button } from "../ui/button";

const FeaturedBlog = () => {
  return (
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Featured Post</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Featured post image"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <Badge className="mb-2 w-fit">Featured</Badge>
            <h3 className="mb-2 text-3xl font-bold">
              <Link to="/blog/featured-post" className="hover:underline">
                The Future of Web Development in 2025
              </Link>
            </h3>
            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>March 21, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock3Icon className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground">
              Explore the latest trends and technologies shaping the future of
              web development. From AI-powered tools to new frameworks, discover
              what's next in the world of web development.
            </p>
            <Button className="w-fit" asChild>
              <Link to="/blog/featured-post">
                Read More <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
  );
};

export default FeaturedBlog;
