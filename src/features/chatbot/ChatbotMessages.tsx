import { messagesSelector, useChatbotSelector } from "../store/store";
import { useGroupByAuthor } from "../hook/use-group-by-author";
import MessageDisplay from "./messages/MessageDisplay";
import { Box, Container, Typography, Avatar } from "@mui/material";
import { css } from "@emotion/react";
import { Group } from "../api/messages";
import { useEffect, useRef } from "react";
import { HeadphonesOutlined } from "@mui/icons-material";

const mainStyle = css`
  flex: 1 1 auto;
  overflow: auto;
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100%;
`;

const emptyStyle = css`
  align-self: center;
  margin: auto;
  padding: 20px;
  text-align: center;
  color: #ccc;
`;

export default function ChatbotMessages() {
  const messages = useChatbotSelector((state) => messagesSelector.selectAll(state));
  const avatar = useChatbotSelector((state) => state.chatbot.avatars);
  const grouped = useGroupByAuthor(messages);

  const lastMessage = useRef<Element>(null);
  useEffect(() => {
    lastMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [grouped]);

  return (
    <Box css={mainStyle}>
      <Container maxWidth="md" disableGutters css={containerStyle}>
        {grouped.length === 0 ? (
          <Box css={emptyStyle}>
            <HeadphonesOutlined fontSize="inherit" sx={{ fontSize: "50px" }} color="inherit"></HeadphonesOutlined>
            <Typography sx={{ color: "disabled.main" }} fontSize="large">
              Find music for you
            </Typography>
          </Box>
        ) : (
          grouped.map((group: Group, index) => (
            <Box
              key={`group-${group.id}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                px: 2,
                pt: 2,
              }}
              ref={index === grouped.length - 1 ? lastMessage : null}
            >
              {group.author === "chatbot" && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Avatar alt=" " src={avatar.chatbot} sx={{ width: 30, height: 30 }}></Avatar>
                  <Typography>Musicbot</Typography>
                </Box>
              )}
              {group.children.map((message) => (
                <MessageDisplay key={`message-${message.id}`} message={message} />
              ))}
              {group.author === "user" && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, alignSelf: "flex-end" }}>
                  <Typography>Me</Typography>
                  <Avatar alt=" " src={avatar.user} sx={{ width: 30, height: 30 }}></Avatar>
                </Box>
              )}
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
}
