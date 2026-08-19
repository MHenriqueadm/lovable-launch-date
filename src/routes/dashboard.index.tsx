import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Painel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-500">
        Placeholder de conteúdo
      </div>
    </div>
  );
}
