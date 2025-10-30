// @flow strict
import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

// ✅ Server-side data fetching with error handling
async function getBlogs() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!res.ok) throw new Error("Failed to fetch blog data");

    return await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// ✅ Page Component
export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      {/* Section Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id || blog.slug}
              blog={blog}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No blogs found. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
