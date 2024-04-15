import { AppBar, Box, Container, IconButton, Typography } from "@mui/material";
import { CloseFullscreenOutlined, CloseOutlined, OpenInFullOutlined } from "@mui/icons-material";
import { useChatbotDispatch, useChatbotSelector } from "../store/store";
import { setOpen, setFullscreen } from "../store/chatbotSlice";

export default function ChatbotHeader() {
  const dispatch = useChatbotDispatch();
  const fullscreen = useChatbotSelector((state) => state.chatbot.fullscreen);

  const handleFullscreenToggle = () => {
    dispatch(setFullscreen(!fullscreen));
  };

  const handleCloseClick = () => {
    dispatch(setOpen(false));
  };

  return (
    <AppBar position="sticky" sx={{ py: 2 }}>
      <Container maxWidth="md" disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pl: 2, pr: 1 }}>
        <Typography variant="h6">Musicbot</Typography>
        <Box>
          <IconButton sx={{ color: "white" }} onClick={handleFullscreenToggle}>
            {fullscreen ? <CloseFullscreenOutlined></CloseFullscreenOutlined> : <OpenInFullOutlined></OpenInFullOutlined>}
          </IconButton>
          <IconButton sx={{ color: "white" }} onClick={handleCloseClick}>
            <CloseOutlined></CloseOutlined>
          </IconButton>
        </Box>
      </Container>
    </AppBar>
  );
}
