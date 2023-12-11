export const parseContent = (content: string) => {
  const paragraphs = content.split("[p]").map((item) => item.trim());
  console.log("paragraphs :", paragraphs);
  return paragraphs;
};
