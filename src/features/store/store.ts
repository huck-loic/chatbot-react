import { configureStore } from "@reduxjs/toolkit";
import { chatbotReducer, messagesAdapter } from "./chatbotSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ChatbotDispatch = typeof store.dispatch;

export const useChatbotDispatch = useDispatch.withTypes<ChatbotDispatch>();
export const useChatbotSelector = useSelector.withTypes<RootState>();

export const messagesSelector = messagesAdapter.getSelectors((state: RootState) => state.chatbot.messages);
