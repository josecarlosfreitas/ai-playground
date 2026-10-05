import { ai } from "./gemini";
import type {
  MensagemHistorico,
  RespostaIA,
} from "@/types/chat";
import { criarPromptChat } from "./prompt";

export async function gerarResposta(
  pergunta: string,
  historico: MensagemHistorico[],
  modelo: string
): Promise<RespostaIA> {
  const contexto = historico
    .map(
      (item) =>
        `Usuário: ${item.pergunta}\nAssistente: ${item.resposta.resposta}`
    )
    .join("\n\n");

  const prompt = criarPromptChat(contexto, pergunta);

  const response = await ai.models.generateContent({
    model: modelo,
    contents: prompt,
  });

  const dados: RespostaIA = JSON.parse(response.text);

  return dados;
}
