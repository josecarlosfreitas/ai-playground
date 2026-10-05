import type { RespostaIA } from "@/types/chat";

type ChatMessageProps = {
  pergunta: string;
  resposta: RespostaIA;
};

export default function ChatMessage({
  pergunta,
  resposta,
}: ChatMessageProps) {
  return (
    <div className="space-y-4">
      {/* Pergunta do usuário */}
      <div className="flex justify-end">
        <div className="max-w-2xl rounded-2xl rounded-br-md bg-zinc-800 px-5 py-4">
          <p className="mb-1 text-xs font-medium text-zinc-500">
            Você
          </p>

          <p className="text-sm leading-6">
            {pergunta}
          </p>
        </div>
      </div>

      {/* Resposta da IA */}
      <div className="flex justify-start">
        <div className="max-w-2xl rounded-2xl rounded-bl-md border border-zinc-800 bg-zinc-900 px-5 py-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm">✦</span>

            <span className="text-xs font-medium text-zinc-400">
              Assistente
            </span>
          </div>

          <p className="text-sm leading-6 text-zinc-200">
            {resposta.resposta}
          </p>

          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
              {resposta.categoria}
            </span>

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
              Confiança {(resposta.confianca * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
