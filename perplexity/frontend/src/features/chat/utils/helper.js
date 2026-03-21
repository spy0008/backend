export const getContent = (content) => {
  if (typeof content === "string") return content;
  if (typeof content === "object")
    return content?.text || JSON.stringify(content);
  return "";
};
