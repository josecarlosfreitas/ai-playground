export type RespostaIA = {
  resposta: string;
  categoria: string;
  confianca: number;
};

export type MensagemHistorico = {
  pergunta: string;
  resposta: RespostaIA;
};
