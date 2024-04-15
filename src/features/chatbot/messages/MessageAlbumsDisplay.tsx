import { Box, Button } from "@mui/material";
import { useChatbotDispatch } from "../../store/store";

import type { MessageDisplayProps } from "./MessageDisplay";
import { sendMessage } from "../../store/chatbotSlice";
import { MessageAlbums } from "../../api/messages";

export default function MessageAlbumsDisplay({ message }: MessageDisplayProps) {
  const dispatch = useChatbotDispatch();

  if (message.type !== "albums") return null;

  const handleClickChoice = (album: MessageAlbums["albums"][number]) => {
    dispatch(sendMessage(`Play a song from ${album.artist} on the album ${album.name}`));
  };

  return (
    <Box component="ul" sx={{ my: 0 }}>
      {message.albums.map((choice) => (
        <Box component="li" key={choice.id}>
          <Button variant="outlined" size="medium" sx={{ mb: 1 }} onClick={() => handleClickChoice(choice)}>
            {choice.name}
          </Button>
        </Box>
      ))}
    </Box>
  );
}
