import { createAsyncThunk, createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import { getWitAiResponse } from "../api/witai";
import { buildMessageFromResponse, createDefaultMessage, createTextMessage } from "../api/messages";

import type { Message, Author } from "../api/messages";
import type { EntityState, PayloadAction } from "@reduxjs/toolkit";
import { getRandomAvataaarsUrl } from "../../utils/get-random-avataaars-url";

type ChatbotState = {
  messages: EntityState<Message, string>;
  playerIds: string[];
  avatars: Record<Author, string>;
  currentPlayer: {
    messageId: string | null;
    youtubeId: string | null;
    playing: boolean;
  };
  fullscreen: boolean;
  open: boolean;
};

export const messagesAdapter = createEntityAdapter({
  selectId: (message: Message) => message.id,
  sortComparer: (a, b) => a.timestamp - b.timestamp,
});

export const sendMessage = createAsyncThunk("chatbot/sendMessage", async (query: string, thunkAPI) => {
  thunkAPI.dispatch(addMessage(createTextMessage(query, "user")));

  const queryID = nanoid();
  const timestamp = Date.now();

  thunkAPI.dispatch(
    addMessage({
      id: queryID,
      timestamp,
      author: "chatbot",
      type: "loading",
    })
  );

  try {
    const response = await getWitAiResponse(query);
    return buildMessageFromResponse(response, queryID, timestamp);
  } catch (error) {
    console.error(error);
    const errorMessage = createDefaultMessage();
    errorMessage.id = queryID;
    errorMessage.timestamp = timestamp;
    return [errorMessage];
  }
});

const initialState: ChatbotState = {
  messages: messagesAdapter.getInitialState(),
  playerIds: [],
  avatars: {
    user: getRandomAvataaarsUrl(),
    chatbot: getRandomAvataaarsUrl(),
  },
  currentPlayer: {
    messageId: null,
    youtubeId: null,
    playing: false,
  },
  fullscreen: false,
  open: true,
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      messagesAdapter.addOne(state.messages, action);
    },
    addMessages(state, action: PayloadAction<Message[]>) {
      messagesAdapter.addMany(state.messages, action);
    },
    setFullscreen(state, action: PayloadAction<boolean>) {
      state.fullscreen = action.payload;
    },
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    setCurrentPlayer(state, action: PayloadAction<{ messageId: string; youtubeId: string; playing?: boolean }>) {
      state.currentPlayer.messageId = action.payload.messageId;
      state.currentPlayer.youtubeId = action.payload.youtubeId;
      state.currentPlayer.playing = action.payload.playing ?? state.currentPlayer.playing;
    },
    setCurrentPlayerToLast(state, action: PayloadAction<boolean | undefined>) {
      const lastPlayerId = state.playerIds[state.playerIds.length - 1];
      if (!lastPlayerId) return;
      const message = state.messages.entities[lastPlayerId];
      if (message && message.type === "player") {
        setCurrentPlayer({
          messageId: message.id,
          youtubeId: message.player.id,
          playing: action.payload,
        });
      }
    },
    setCurrentPlaying(state, action: PayloadAction<boolean>) {
      state.currentPlayer.playing = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      console.log("add", action);
      for (const message of action.payload) {
        if (message.type === "player") {
          state.playerIds.push(message.id);
        }
      }
      messagesAdapter.upsertMany(state.messages, action.payload);
    });
  },
});

export const { addMessage, addMessages, setFullscreen, setOpen, setCurrentPlayer, setCurrentPlayerToLast, setCurrentPlaying } = chatbotSlice.actions;
export const chatbotReducer = chatbotSlice.reducer;
