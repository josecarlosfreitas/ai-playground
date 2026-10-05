export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 py-5">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          ✦ AI Playground
        </h1>

        <p className="text-sm text-zinc-500">
          AI Engineering Lab
        </p>
      </div>

      <div className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs text-zinc-400">
        Gemini 3.5 Flash
      </div>
    </header>
  );
}
