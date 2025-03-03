"use client";
import { Tooltip } from "antd";
import { useMemo } from "react";

interface Props {
  contents: string[];
  isShowTheThird: boolean;
  language: "en" | "vi";
}

export const Sentence = ({ contents, isShowTheThird, language }: Props) => {
  const displayText = language === "en" ? contents[0] : contents[1];

  const contentTooltip = useMemo(() => {
    if (isShowTheThird) {
      return (
        <>
          <p className="text-yellow-300 border-b-2 border-orange-500 pb-1">
            {language === "en" ? contents[1] : contents[0]}
          </p>
          <p className="pt-1">{contents[2]}</p>
        </>
      );
    }
    return language === "en" ? contents[1] : contents[0];
  }, [contents, isShowTheThird, language]);

  return (
    <Tooltip
      title={contentTooltip}
      overlayStyle={{ maxWidth: 400 }}
      overlayInnerStyle={{ maxWidth: 400 }}
      color="#1da1f2"
    >
      <span className="hover:bg-blue-400 hover:rounded">{displayText}</span>
    </Tooltip>
  );
};
