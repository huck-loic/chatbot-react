import { useMemo } from "react";

import type { Message, Group } from "../api/messages";

export function useGroupByAuthor(messages: Message[]) {
  return useMemo<Group[]>(() => {
    return messages.reduce<Group[]>((acc, message) => {
      let last = acc[acc.length - 1];
      if (acc.length === 0 || !last || last.author !== message.author) {
        last = {
          id: message.id,
          author: message.author,
          children: [],
        };

        acc.push(last);
      }

      last.children.push(message);
      return acc;
    }, []);
  }, [messages]);
}
