import { Modelo } from "@/lib/ai/models";

type ModelSelectorProps = {
  modelos: Modelo[];
  modeloSelecionado: string;
  onModeloChange: (modelo: string) => void;
};

export default function ModelSelector({
  modelos,
  modeloSelecionado,
  onModeloChange,
}: ModelSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-500">
        Modelo
      </span>

      <select
        value={modeloSelecionado}
        onChange={(e) => onModeloChange(e.target.value)}
        className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 outline-none transition focus:border-zinc-600"
      >
        {modelos.map((modelo) => (
          <option key={modelo.id} value={modelo.id}>
            {modelo.nome}
          </option>
        ))}
      </select>
    </div>
  );
}