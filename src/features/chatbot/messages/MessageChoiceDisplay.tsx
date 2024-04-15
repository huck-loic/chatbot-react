import { Box, Button } from "@mui/material";
import { useChatbotDispatch } from "../../store/store";

import type { MessageDisplayProps } from "./MessageDisplay";
import { sendMessage } from "../../store/chatbotSlice";

export default function MessageChoiceDisplay({ message }: MessageDisplayProps) {
  const dispatch = useChatbotDispatch();

  if (message.type !== "choice") return null;

  const handleClickChoice = (value: string) => {
    dispatch(sendMessage(value));
  };

  return (
    <Box component="ul" sx={{ my: 0 }}>
      {message.choices.map((choice) => (
        <Box component="li" key={choice.value}>
          <Button variant="outlined" size="medium" sx={{ mb: 1 }} onClick={() => handleClickChoice(choice.value)}>
            {choice.label}
          </Button>
        </Box>
      ))}
    </Box>
  );
}
