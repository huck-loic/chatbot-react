import MessageTextDisplay from "./MessageTextDisplay";
import MessageLoadingDisplay from "./MessageLoadingDisplay";
import MessageChoiceDisplay from "./MessageChoiceDisplay";
import MessageAlbumsDisplay from "./MessageAlbumsDisplay";
import MessageAlbumDisplay from "./MessageAlbumDisplay";
import MessagePlayerDisplay from "./MessagePlayerDisplay";

import type { Message, MessageType } from "../../api/messages";
import type { ComponentType } from "react";
export type MessageDisplayProps = {
  message: Message;
};

// Use a Record to force support of all defined components type
const MESSAGE_COMPONENTS: Record<MessageType, ComponentType<MessageDisplayProps>> = {
  loading: MessageLoadingDisplay,
  text: MessageTextDisplay,
  choice: MessageChoiceDisplay,
  album: MessageAlbumDisplay,
  albums: MessageAlbumsDisplay,
  player: MessagePlayerDisplay,
};

export default function MessageDisplay({ message }: MessageDisplayProps) {
  const Component = MESSAGE_COMPONENTS[message.type];
  return <Component message={message} />;
}
