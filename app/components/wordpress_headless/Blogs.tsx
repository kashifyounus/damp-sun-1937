import { cn } from "app c/lib/utils";
import { Button } from "../ui/button";
import SingleBlog from "./Blog";

const BlogsList = ({
  posts,
  pageTitle = "Our Blog Posts",
  loadMore = true,
}: {
  posts: any[];
  pageTitle?: string;
  loadMore?: boolean;
}) => {
  //const { posts } = useWPStore();
 // console.log('BlogsList:', posts);
  return (
    <div
      className={cn(
        "py-20 relative flex items-center justify-center"
      )}
      style={{
        backgroundColor: "rgb(29 78 216 / var(--tw-bg-opacity, 1))",
        backgroundImage: `
            linear-gradient(rgba(248, 248, 248, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="flex flex-col items-center justify-center container mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-4xl font-bold text-white">{pageTitle}</h2>
          <div className="flex gap-2">
            {/* <Button variant="outline" size="sm">
          All
        </Button>
        <Button variant="ghost" size="sm">
          Tutorials
        </Button>
        <Button variant="ghost" size="sm">
          News
        </Button>
        <Button variant="ghost" size="sm">
          Insights
        </Button> */}
          </div>
        </div>
        <Data posts={posts} />
        {loadMore && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsList;

const Data = ({ posts }) => {
  return (
    <div className="grid gap-4 lg:gap-14 sm:grid-cols-2 lg:grid-cols-3 px-4 lg:px-18 xl:px-24">
      {posts.map((post) => (
        <SingleBlog key={post.id} post={post} />
      ))}
    </div>
  );
};
