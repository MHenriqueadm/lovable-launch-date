import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cadastro")({
  component: Cadastro,
});

function Cadastro() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-8">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">RESTYLE</h1>
        <p className="text-gray-400">Página de cadastro em construção.</p>
        <div className="h-px bg-gray-900" />
        <button onClick={() => window.history.back()} className="text-sm text-gray-500 hover:text-white underline">
          Voltar
        </button>
      </div>
    </div>
  );
}
