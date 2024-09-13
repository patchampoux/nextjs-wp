import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Paragraph = ({ content, textAlign = "left", textColor }) => {
  return (
    <p
      className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
      dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
      style={{ color: textColor }}
    />
  );
};