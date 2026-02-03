"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-10 border-t pt-10">
      <Giscus
        id="comments"
        repo="qq123qwer/geyuhangblog" // TODO: Replace with your actual repo (e.g., 'username/repo')
        repoId="R_kgDORHtzEQ"
        category="General"
        categoryId="DIC_kwDORHtzEs4CQm3_"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
