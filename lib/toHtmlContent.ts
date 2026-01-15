import { HtmlContent } from "@/types/article";

export const toHtmlContent = (content: HtmlContent) => {
  const htmlString =
    typeof content === "string"
      ? content.replace(/<\/\/>/g, "<br />")
      : content?.__html || "";

  return { __html: htmlString };
};
