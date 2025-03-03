"use client";
import { chaps } from "@/app/data";
import matter from "gray-matter";
import React, { useEffect, useMemo, useState } from "react";
import { Sentence } from "./Sentence";
import { parseContent } from "./utils";
import { Button } from "antd";

export default function ChapDetail({ params }: any) {
  const { slug } = params || {};
  const [isControlKeyPressed, setIsControlKeyPressed] = useState(false);
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const [mounted, setMounted] = useState(false);

  // Add this useEffect for client-side initialization
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as "en" | "vi";
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
    setMounted(true);
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language);
    }
  }, [language, mounted]);

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

  // Don't render language-dependent content until after client-side hydration
  const buttonText = mounted
    ? language === "en"
      ? "Switch to Vietnamese"
      : "Switch to English"
    : "Switch to Vietnamese"; // Default text for server render

  return (
    <article>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">{fontMatter.title}</h1>
        <Button
          onClick={() => setLanguage((prev) => (prev === "en" ? "vi" : "en"))}
          color="cyan"
          // @ts-ignore
          variant="solid"
        >
          {buttonText}
        </Button>
      </div>
      {parsed.map((p: string[][], index: number) => {
        return (
          <p
            key={index}
            className="mt-6 text-justify text-[17px] line font-light text-red-50 leading-7"
          >
            {p.map((s: string[], index: number) => {
              return (
                <React.Fragment key={index}>
                  <Sentence
                    isShowTheThird={isControlKeyPressed}
                    contents={s}
                    language={mounted ? language : "en"}
                  />{" "}
                </React.Fragment>
              );
            })}
          </p>
        );
      })}
    </article>
  );
}
