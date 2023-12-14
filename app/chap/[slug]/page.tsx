"use client";
import { chaps } from "@/app/data";
import matter from "gray-matter";
import React, { useEffect, useMemo, useState } from "react";
import { Sentence } from "./Sentence";
import { parseContent } from "./utils";

export default function ChapDetail({ params }: any) {
  console.log("params :", params);
  const { slug } = params || {};
  const [isControlKeyPressed, setIsControlKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      // Check if the Control key is pressed
      const isControlKey = event.ctrlKey || event.metaKey; // Use metaKey for Command key on Mac

      // Update the state based on the Control key status
      setIsControlKeyPressed(isControlKey);
    };

    const handleKeyUp = () => {
      // Update the state when the Control key is released
      setIsControlKeyPressed(false);
    };

    // Add event listeners when the component mounts
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const chap = chaps.find((chap) => chap.slug === slug);
  if (!chap) return undefined;

  const { data: fontMatter, content } = matter(chap);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const parsed = useMemo(() => {
    if (!content) return [];
    return parseContent(content);
  }, [content]);

  return (
    <article>
      <h1 className="text-4xl font-bold mb-10">{fontMatter.title}</h1>
      {parsed.map((p: string[][], index: number) => {
        return (
          <p key={index} className="mt-6 text-justify" onSelect={console.log}>
            {p.map((s: string[], index: number) => {
              return (
                <React.Fragment key={index}>
                  <Sentence isShowTheThird={isControlKeyPressed} contents={s} />{" "}
                </React.Fragment>
              );
            })}
          </p>
        );
      })}
    </article>
  );
}
