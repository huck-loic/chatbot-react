import ChatbotApp from "./features/chatbot/ChatbotApp";
import { Provider } from "react-redux";
import { store } from "./features/store/store.ts";
import { ScopedCssBaseline } from "@mui/material";

export default function App() {
  return (
    <Provider store={store}>
      <ScopedCssBaseline sx={{ background: "transparent" }}>
        <ChatbotApp />
      </ScopedCssBaseline>
    </Provider>
  );
}
