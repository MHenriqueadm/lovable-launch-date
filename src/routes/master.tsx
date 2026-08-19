import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/master")({
  component: MasterPlaceholder,
});

function MasterPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold font-mono tracking-widest text-red-500">RESTYLE MASTER</h1>
        <p className="text-gray-600 text-sm">Acesso restrito.</p>
      </div>
    </div>
  );
}
