import Link from "next/link";
import { TChap } from "./types/Chap.types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const getAllChaps = (): TChap[] => {
  const chapDir = "chaps";
  const files = fs.readdirSync(path.join(chapDir));

  const chaps = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(chapDir, filename), "utf-8");
    const { data: frontMatter } = matter(fileContent);
    return {
      slug: filename.replace(".txt", ""),
      meta: frontMatter as any,
    };
  });

  return chaps;
};

export default function Home() {
  const chaps = getAllChaps();
  return (
    <main className="flex flex-col">
      <h1 className="text-4xl font-bold">Chapters 👋</h1>
      <section className="py-10">
        <h2 className="text-2xl font-bold">Latest</h2>
        <div className="py-2">
          {chaps.map((chap) => (
            <Link href={"/chaps/" + chap.slug} passHref key={chap.slug}>
              <div className="py-2 flex justify-between align-middle gap-2">
                <div>
                  <h3 className="text-lg font-blod">{chap.meta.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
