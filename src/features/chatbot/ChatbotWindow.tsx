import { css } from "@emotion/react";
import { Box, Fab, Paper, Slide } from "@mui/material";
import { ContactSupportOutlined } from "@mui/icons-material";
import { useChatbotDispatch, useChatbotSelector } from "../store/store";
import { setOpen } from "../store/chatbotSlice";

import type { PropsWithChildren } from "react";

const fullscreenStyle = css`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
`;

const popupStyle = css`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 600px;
  padding: 20px;
`;

const windowStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const openButtonStyle = css`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export default function ChatbotWindow({ children }: PropsWithChildren) {
  const fullscreen = useChatbotSelector((state) => state.chatbot.fullscreen);
  const open = useChatbotSelector((state) => state.chatbot.open);
  const dispatch = useChatbotDispatch();

  const handleOpen = () => {
    dispatch(setOpen(true));
  };

  return (
    <>
      <Slide direction="up" in={!open}>
        <Fab size="medium" color="primary" aria-label="open chatbot" css={openButtonStyle} onClick={handleOpen}>
          <ContactSupportOutlined />
        </Fab>
      </Slide>
      <Slide direction="up" in={open}>
        {fullscreen ? (
          <Box css={fullscreenStyle}>
            <Box css={windowStyle}>{children}</Box>
          </Box>
        ) : (
          <Box css={popupStyle}>
            <Paper elevation={2} css={windowStyle}>
              {children}
            </Paper>
          </Box>
        )}
      </Slide>
    </>
  );
}
