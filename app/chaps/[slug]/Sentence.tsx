"use client";
import { Tooltip } from "antd";
import { useMemo } from "react";

interface Props {
  contents: string[];
  isShowTheThird: boolean;
}

export const Sentence = ({ contents, isShowTheThird }: Props) => {
  const contentTooltip = useMemo(() => {
    if (isShowTheThird) {
      return (
        <>
          <p className="text-yellow-300 border-b-2 border-orange-500 pb-1">
            {contents[1]}
          </p>
          <p className="pt-1">{contents[2]}</p>
        </>
      );
    }
    return contents[1];
  }, [contents, isShowTheThird]);

  return (
    <Tooltip
      title={contentTooltip}
      overlayStyle={{ maxWidth: 400 }}
      overlayInnerStyle={{ maxWidth: 400 }}
      color="#1da1f2"
    >
      <span onClick={console.log} className="hover:bg-blue-400 hover:rounded">
        {contents[0]}
      </span>
    </Tooltip>
  );
};
