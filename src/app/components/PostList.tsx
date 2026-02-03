"use client";

import { allPosts, type Post } from "content-collections";
import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const POSTS_PER_PAGE = 20;

// Sort posts once globally to avoid sorting on every render.
// Create a copy to prevent mutating the original array.
const allSortedPosts = [...allPosts].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function PostList() {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const { ref } = useInView({
    threshold: 0,
    rootMargin: "200px", // Trigger loading before reaching the very bottom
    onChange: (inView) => {
      if (inView) {
        setVisibleCount((prev) => {
          if (prev >= allSortedPosts.length) {
            return prev;
          }
          return Math.min(prev + POSTS_PER_PAGE, allSortedPosts.length);
        });
      }
    },
  });

  // Derived state - no need for useEffect or extra state
  const displayedPosts = allSortedPosts.slice(0, visibleCount);

  return (
    <div className="space-y-8 mt-16">
      {displayedPosts.map((post) => (
        <article key={post._meta.path} className="border-b pb-8">
          <Link href={`/posts/${post._meta.path}`} className="block group">
            <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <div className="text-gray-500 mb-4 text-sm">
              {new Date(post.date).toLocaleDateString()}
            </div>
            <p className="text-gray-700">{post.description}</p>
          </Link>
        </article>
      ))}

      {/* Loading trigger */}
      {visibleCount < allSortedPosts.length && (
        <div ref={ref} className="py-8 text-center text-gray-500">
          Loading more posts...
        </div>
      )}

      {/* End of list message */}
      {visibleCount >= allSortedPosts.length && allSortedPosts.length > 0 && (
        <div className="py-8 text-center text-gray-400 text-sm">
          No more posts
        </div>
      )}
    </div>
  );
}
