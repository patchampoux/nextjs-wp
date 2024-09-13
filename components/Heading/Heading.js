import React from "react";
import { getFontSizeForHeading, getTextAlign } from "utils/fonts";

export const Heading = ({ content, level = 2, textAlign }) => {
  return React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `font-heading max-width-5xl mx-auto my-5 ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`
  });
};