const parseToArray = (content: string) => {
  const paragraphs = content
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  return paragraphs.map((item) =>
    item
      .split(".")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => item + ".")
  );
};

export const parseContent = (content: string) => {
  const startIndex = content.indexOf("[en]") + "[en]".length;
  const endIndex = content.indexOf("[vi]");

  const enContext = content.slice(startIndex, endIndex).trim();
  const viContext = content.slice(endIndex + "[vi]".length).trim();
  const enResult = parseToArray(enContext);
  console.log("enResult :", enResult);
  const viResult = parseToArray(viContext);
  console.log("viResult :", viResult);

  const mergedArray = enResult.map((item, i) => {
    return item.map((item, j) => {
      return [item, viResult?.[i]?.[j]];
    });
  });

  return mergedArray;
};
