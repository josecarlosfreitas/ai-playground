import { gerarResposta } from "@/lib/ai/chat";
import { listarModelos } from "@/lib/ai/models";
import type { MensagemHistorico } from "@/types/chat";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const pergunta: string = body.pergunta;
    const historico: MensagemHistorico[] = body.historico;
    const modelo: string = body.modelo;

    if (!modelo) {
      return Response.json(
        {
          erro: "Nenhum modelo foi selecionado.",
        },
        { status: 400 }
      );
    }

    const modelos = await listarModelos();

    const modeloValido = modelos.some(
      (item) => item.id === modelo
    );

    if (!modeloValido) {
      return Response.json(
        {
          erro: "O modelo selecionado não está disponível.",
        },
        { status: 400 }
      );
    }

    const resposta = await gerarResposta(
      pergunta, 
      historico, 
      modelo
    );

    return Response.json({
      pergunta,
      resposta,
    });
    } catch (error) {
    console.error("Erro na API de chat:", error);

    const mensagem = String(error);

    if (
      mensagem.includes("429") ||
      mensagem.includes("RESOURCE_EXHAUSTED")
    ) {
      return Response.json(
        {
          erro: "O limite de uso deste modelo foi atingido. Tente novamente mais tarde ou selecione outro modelo.",
        },
        { status: 429 }
      );
    }

    return Response.json(
      {
        erro: "O serviço de IA está temporariamente indisponível.",
      },
      { status: 503 }
    );
  }
}