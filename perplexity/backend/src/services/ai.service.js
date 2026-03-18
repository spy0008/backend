import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistral = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  const response = await gemini.invoke(
    messages.map((msg) => {
      if (msg.roloe == "user") {
        return new HumanMessage(msg.content);
      } else if (msg.roloe == "ai") {
        return new AIMessage(msg.content);
      }
    }),
  );

  return response.text;
}

export async function generateChatTitle(message) {
  const response = await mistral.invoke([
    new SystemMessage(`You are a  helpful assistant that generates concise and descriptive titles for chat conversations. 
      User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 3-4 words. The title should be clear, relevant, and engaging, giving ysers a quick understanding of the chat's topic.
      `),

    new HumanMessage(`
      Generate a title for a chat conversation based on the following first message: "${message}"
      `),
  ]);

  return response.text;
}
