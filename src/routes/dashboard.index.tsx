import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Painel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-400 text-sm">Métrica {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="h-64 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-500">
        Placeholder de conteúdo
      </div>
    </div>
  );
}
