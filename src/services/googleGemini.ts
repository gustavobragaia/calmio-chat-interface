import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY não definida no .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // pode trocar pra 1.5-pro depois se quiser
});

export async function getGeminiReply(userMessage: string): Promise<string> {
  const prompt = `
Você é o Calmio, um chatbot acolhedor de apoio emocional.
- Fale em português do Brasil.
- Seja empático, gentil e objetivo.
- Lembre sempre que você NÃO substitui um psicólogo ou psiquiatra.
- Em situações graves (ideação suicida, autoagressão, etc.), oriente a buscar ajuda profissional imediatamente e serviços de emergência.

Mensagem do usuário:
"""${userMessage}"""
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}