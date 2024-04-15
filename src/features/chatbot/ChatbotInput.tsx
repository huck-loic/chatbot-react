import { useState } from "react";
import { Box, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { useChatbotDispatch } from "../store/store";
import { sendMessage } from "../store/chatbotSlice";

import type { FormEvent } from "react";

export default function ChatbotInput() {
  const [input, setInput] = useState("");
  const dispatch = useChatbotDispatch();

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (input === "") return;
    dispatch(sendMessage(input));
    setInput("");
  };

  return (
    <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2 }}>
      <Container maxWidth="md" disableGutters>
        <FormControl fullWidth={true} variant="outlined">
          <InputLabel htmlFor="chatbot-input" size="small">
            Ask about music
          </InputLabel>
          <OutlinedInput
            id="chatbot-input"
            type="text"
            autoComplete="off"
            size="small"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" disabled={input === ""} aria-label="send message" edge="end">
                  <SendRounded color={input === "" ? "disabled" : "primary"} />
                </IconButton>
              </InputAdornment>
            }
            label="Ask about music"
          />
        </FormControl>
      </Container>
    </Box>
  );
}
