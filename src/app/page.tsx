"use client";

import { useEffect, useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessage from "@/components/chat/ChatMessage";
import type { MensagemHistorico } from "@/types/chat";
import ChatInput from "@/components/chat/ChatInput";
import EmptyChat from "@/components/chat/EmptyChat";
import ModelSelector from "@/components/chat/ModelSelector";
import { Modelo } from "@/lib/ai/models";

export default function Home() {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pergunta, setPergunta] = useState("");

  const [historico, setHistorico] = useState<MensagemHistorico[]>([]);

  const [modelos, setModelos] = useState<Modelo[]>([]);

  const [modeloSelecionado, setModeloSelecionado] = useState("");

  useEffect(() => {
    async function carregarModelos() {
      try {
        const response = await fetch("/api/models");

        const data = await response.json();

        if (!response.ok) {
          console.error(data.erro);
          return;
        }

        setModelos(data.modelos);
        if (data.modelos.length > 0) {
          setModeloSelecionado(data.modelos[0].id);
        }
      } catch (error) {
        console.error("Erro ao carregar modelos:", error);
      }
    }

    carregarModelos();
  }, []);

  async function perguntar() {
    if (!pergunta.trim()) {
      return;
    }

    setErro(null);
    setCarregando(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pergunta,
          historico,
          modelo: modeloSelecionado,
        }),
      });

      const data = await response.json();

      console.log("Resposta da API:", data);

      if (!response.ok) {
        console.error(data.erro);
        setErro(data.erro || "Ocorreu um erro ao processar sua pergunta.");
        return;
      }

      setHistorico((anterior) => [
        ...anterior,
        {
          pergunta,
          resposta: data.resposta,
        },
      ]);

      setPergunta("");
    } catch (error) {
      console.error("Erro:", error);
      setErro("Não foi possível conectar com o serviço de IA.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6">

        <ChatHeader />

        <ModelSelector
          modelos={modelos}
          modeloSelecionado={modeloSelecionado}
          onModeloChange={setModeloSelecionado}
        />

        <section className="flex flex-1 flex-col py-10">

          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Converse com a IA
            </h2>

            <p className="mt-3 text-zinc-500">
              Explore contexto, prompts e respostas estruturadas.
            </p>
          </div>

          <div className="flex-1 space-y-6">

            {erro && (
              <div className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                ⚠️ {erro}
              </div>
            )}

            {historico.length === 0 && <EmptyChat />}

            {historico.map((item, index) => (
              <ChatMessage
                key={index}
                pergunta={item.pergunta}
                resposta={item.resposta}
              />
            ))}

          </div>

          <ChatInput
            pergunta={pergunta}
            onPerguntaChange={setPergunta}
            onEnviar={perguntar}
            carregando={carregando}
          />

        </section>
      </div>
    </main>
  );
}