"use client";
import { parseContent } from "./utils";
import React, { useEffect, useMemo, useState } from "react";
import { Sentence } from "./Sentence";
import { getChap } from "./getChap";

export default function ChapDetail({ params }: any) {
  const [result, setResult] = React.useState<any>(null);
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

  React.useEffect(() => {
    getChap(params).then((res) => {
      setResult(res);
    });
  }, [params]);

  const { fontMatter, content } = result || {};

  const parsed = useMemo(() => {
    if (!content) return [];
    return parseContent(content);
  }, [content]);

  if (!result) {
    return <div>Loading...</div>;
  }

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
