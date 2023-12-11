import matter from "gray-matter";
import path from "path";
import fs from "fs";
import { parseContent } from "./utils";

function getChap({ slug }: { slug: string }) {
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

export default function ChapDetail({ params }: any) {
  const { fontMatter, content } = getChap(params);
  console.log("****marked");
  console.log("content :", content);
  const test = parseContent(content);

  return (
    <article>
      <h1 className="text-4xl font-bold mb-10">{fontMatter.title}</h1>
      {test.map((p: string, index: number) => {
        console.log("p :", p);
        return <p key={index}>{p}</p>;
      })}
    </article>
  );
}
