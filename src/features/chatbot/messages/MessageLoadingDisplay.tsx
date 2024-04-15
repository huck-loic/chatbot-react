import Bubble from "../ui/Bubble";
import { IconLoading } from "../ui/icons/IconLoading";

import type { MessageDisplayProps } from "./MessageDisplay";

export default function MessageLoadingDisplay({ message }: MessageDisplayProps) {
  return (
    <Bubble author={message.author}>
      <IconLoading></IconLoading>
    </Bubble>
  );
}
