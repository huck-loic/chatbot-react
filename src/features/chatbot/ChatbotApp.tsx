import ChatbotMessages from "./ChatbotMessages";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotInput from "./ChatbotInput";
import ChatbotWindow from "./ChatbotWindow";
import PlayerHidden from "../youtube/PlayerHidden";

export default function ChatbotApp() {
  return (
    <>
      <ChatbotWindow>
        <ChatbotHeader />
        <ChatbotMessages />
        <ChatbotInput />
      </ChatbotWindow>
      <PlayerHidden />
    </>
  );
}
