import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import Comments from "../../components/Comments";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.description,
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto py-10 px-4 max-w-3xl">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-4">
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <p className="text-xl text-gray-600">{post.description}</p>
        {post.tags && (
          <div className="flex justify-center gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXContent code={post.mdx} />
      </div>
      <Comments />
    </article>
  );
}
