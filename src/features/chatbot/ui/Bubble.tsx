import { Box } from "@mui/material";
import { Author } from "../../api/messages";

import type { PropsWithChildren } from "react";

type BubbleProps = PropsWithChildren<{
  author: Author;
}>;

const bubbleStyle = {
  py: 1.25,
  px: 2,
  mb: 1,
  borderRadius: 6,
};

const chatbotStyle = {
  borderTopLeftRadius: 3,
  color: "primary.contrastText",
  bgcolor: "primary.main",
  alignSelf: "flex-start",
  mr: 6,
};

const userStyle = {
  borderBottomRightRadius: 3,
  color: "black",
  bgcolor: "rgba(0, 0, 0, 0.08)",
  alignSelf: "flex-end",
  ml: 6,
};

export default function Bubble({ author, children }: BubbleProps) {
  return <Box sx={[bubbleStyle, author === "chatbot" ? chatbotStyle : userStyle]}>{children}</Box>;
}
