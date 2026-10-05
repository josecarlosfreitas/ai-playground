type ChatInputProps = {
  pergunta: string;
  onPerguntaChange: (pergunta: string) => void;
  onEnviar: () => void;
  carregando: boolean;
};

export default function ChatInput({
  pergunta,
  onPerguntaChange,
  onEnviar,
  carregando,
}: ChatInputProps) {
  return (
    <div className="sticky bottom-0 mt-10 pb-6">
      <div className="flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-2xl">
        <input
          value={pergunta}
          onChange={(e) => onPerguntaChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEnviar();
            }
          }}
          disabled={carregando}
          placeholder="Digite sua pergunta..."
          className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-600"
        />

        <button
            onClick={onEnviar}
            disabled={carregando}
            className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
            {carregando ? "..." : "➤"}
            </button>
      </div>

      <p className="mt-3 text-center text-xs text-zinc-600">
        AI Playground · Gemini · Structured Output
      </p>
    </div>
  );
}