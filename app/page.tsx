import matter from "gray-matter";
import Link from "next/link";
import { chaps } from "./data";

export default function Home() {
  return (
    <main className="flex flex-col">
      <h1 className="text-4xl font-bold">Chapters 👋</h1>
      <section className="py-10">
        <h2 className="text-2xl font-bold">Latest</h2>
        <div className="py-2">
          {chaps.map((chap) => {
            const { slug, content } = chap;
            const { data: meta } = matter(content);
            return (
              <Link href={"/chap/" + slug} passHref key={slug}>
                <div className="py-2 flex justify-between align-middle gap-2">
                  <div>
                    <h3 className="text-lg font-blod">{meta.title}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
