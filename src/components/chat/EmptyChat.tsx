export default function EmptyChat() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mb-4 text-4xl">
          ✦
        </div>

        <h3 className="text-lg font-medium">
          Comece uma conversa
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Faça uma pergunta para testar o modelo e explorar
          como o contexto da conversa é utilizado.
        </p>
      </div>
    </div>
  );
}