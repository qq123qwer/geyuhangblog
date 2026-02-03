import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "content", // 存放 .mdx 文件的目录
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      slug: document._meta.path,
      mdx,
    };
  },
});

// Rehype Pretty Code 配置选项
const prettyCodeOptions: Options = {
  theme: "one-dark-pro", // 这里的配色和 VS Code 一致
  keepBackground: true,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

export default defineConfig({
  collections: [posts],
  // 集成代码高亮处理
  mdx: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});
