import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-[#0a0a0a]">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-white tracking-tight">RESTYLE</h1>
        <p className="text-gray-400 text-lg">
          Fundação técnica pronta. Escolha seu destino.
        </p>
      </div>
    </div>
  );
}