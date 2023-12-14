"use server";

import matter from "gray-matter";
import path from "path";
import fs from "fs";

export async function getChap({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("chaps", slug + ".txt"),
    "utf-8"
  );

  const { data: fontMatter, content } = matter(markdownFile);

  return {
    fontMatter,
    slug,
    content,
  };
}
