import Bubble from "../ui/Bubble";

import type { MessageDisplayProps } from "./MessageDisplay";

export default function MessageTextDisplay({ message }: MessageDisplayProps) {
  if (message.type !== "text") return null;
  return <Bubble author={message.author}>{message.text}</Bubble>;
}
