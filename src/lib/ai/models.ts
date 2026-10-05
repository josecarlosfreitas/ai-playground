import { ai } from "./gemini";

export type Modelo = {
  id: string;
  nome: string;
};

let modelosCache: Modelo[] | null = null;

export async function listarModelos(): Promise<Modelo[]> {

  if (modelosCache) {
    return modelosCache;
  }

  const modelos: Modelo[] = [];

  for await (const model of await ai.models.list()) {
    if (!model.supportedActions?.includes("generateContent")) {
      continue;
    }

    const nome = model.name?.replace("models/", "");

    if (!nome) {
      continue;
    }

    if (
      nome.includes("tts") ||
      nome.includes("image") ||
      nome.includes("nano-banana") ||
      nome.includes("transcribe") ||
      nome.includes("lyria") ||
      nome.includes("robotics") ||
      nome.includes("computer-use") ||
      nome.includes("antigravity") ||
      nome.includes("deep-research")
    ) {
      continue;
    }

    modelos.push({
      id: nome,
      nome: model.displayName ?? nome,
    });
  }

  modelosCache = modelos;
  
  return modelos;
}