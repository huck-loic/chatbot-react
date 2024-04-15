import { Box } from "@mui/material";
import ReactPlayer from "react-player/youtube";
import { useChatbotSelector } from "../store/store";

export default function PlayerHidden() {
  const { youtubeId, playing } = useChatbotSelector((state) => state.chatbot.currentPlayer);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        transform: "translateY(-100%)",
      }}
    >
      <ReactPlayer url={`https://www.youtube-nocookie.com/embed/${youtubeId}`} playing={playing}></ReactPlayer>
    </Box>
  );
}
