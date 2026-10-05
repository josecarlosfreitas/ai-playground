export function criarPromptChat(
  contexto: string,
  pergunta: string
) {
  return `
Você é um assistente inteligente.

Use o histórico da conversa para entender o contexto da pergunta atual.

Histórico:
${contexto}

Pergunta atual:
${pergunta}

Responda obrigatoriamente neste formato JSON:

{
  "resposta": "resposta para o usuário",
  "categoria": "categoria da pergunta",
  "confianca": 0
}

Regras:
- "resposta" deve conter somente a resposta para o usuário.
- "categoria" deve identificar o assunto.
- "confianca" deve ser um número entre 0 e 1.
- Não escreva nada fora do JSON.
`;
}
