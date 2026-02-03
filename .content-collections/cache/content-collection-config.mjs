// content-collections.conf.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";
var posts = defineCollection({
  name: "posts",
  directory: "content",
  // 存放 .mdx 文件的目录
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    content: z.string()
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      slug: document._meta.path,
      mdx
    };
  }
});
var prettyCodeOptions = {
  theme: "one-dark-pro",
  // 这里的配色和 VS Code 一致
  keepBackground: true,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  }
};
var content_collections_conf_default = defineConfig({
  collections: [posts],
  // 集成代码高亮处理
  mdx: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
  }
});
export {
  content_collections_conf_default as default
};
