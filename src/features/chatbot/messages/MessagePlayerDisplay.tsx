import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import { useChatbotDispatch, useChatbotSelector } from "../../store/store";
import { setCurrentPlayer, setCurrentPlaying } from "../../store/chatbotSlice";

import type { MessageDisplayProps } from "./MessageDisplay";

export default function MediaControlCard({ message }: MessageDisplayProps) {
  const messageId = useChatbotSelector((state) => state.chatbot.currentPlayer.messageId);
  const playing = useChatbotSelector((state) => state.chatbot.currentPlayer.playing);
  const dispatch = useChatbotDispatch();

  if (message.type !== "player") return null;

  const currentPlaying = playing && messageId === message.id;

  const handleTogglePlaying = () => {
    if (currentPlaying) {
      dispatch(setCurrentPlaying(false));
    } else {
      dispatch(
        setCurrentPlayer({
          messageId: message.id,
          youtubeId: message.player.youtubeId,
          playing: true,
        })
      );
    }
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {message.player.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {message.player.artist}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="play/pause" onClick={handleTogglePlaying}>
              {currentPlaying ? <PauseCircleOutlinedIcon sx={{ height: 38, width: 38 }} /> : <PlayCircleOutlinedIcon sx={{ height: 38, width: 38 }} />}
            </IconButton>
          </Box>
        </Box>
        {message.player.thumb && <CardMedia component="img" sx={{ width: 151 }} image={`${message.player.thumb}/preview`} alt={message.player.title} />}
      </Card>
    </Box>
  );
}
