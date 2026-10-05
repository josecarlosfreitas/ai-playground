import { listarModelos } from "@/lib/ai/models";

export async function GET() {
  try {
    const modelos = await listarModelos();

    return Response.json({
      modelos,
    });
  } catch (error) {
    console.error("Erro ao listar modelos:", error);

    return Response.json(
      {
        erro: "Não foi possível listar os modelos disponíveis.",
      },
      { status: 500 }
    );
  }
}