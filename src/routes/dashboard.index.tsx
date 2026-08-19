import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useBarbershop } from "@/contexts/BarbershopContext";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { profile } = useAuth();
  const { barbershop } = useBarbershop();

  const stats = [
    { label: "Agendamentos Hoje", value: "12", icon: Calendar, color: "text-blue-500" },
    { label: "Novos Clientes", value: "48", icon: Users, color: "text-green-500" },
    { label: "Faturamento (Mês)", value: "R$ 4.250", icon: DollarSign, color: "text-yellow-500" },
    { label: "Taxa de Retorno", value: "+15%", icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-8 font-manrope">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Olá, {profile?.name || "Barbeiro"}</h1>
        <p className="text-gray-400 mt-1">Aqui está o que está acontecendo na {barbershop?.name || "sua barbearia"} hoje.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-black border-gray-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Próximos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-gray-900 bg-gray-950/50">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center font-bold text-gray-500">
                    C{i}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Cliente Exemplo {i}</p>
                    <p className="text-xs text-gray-500">Corte & Barba • 14:30</p>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20">
                    Confirmado
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Desempenho da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-gray-900 bg-gray-950/50">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-white">
                    B{i}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Barbeiro {i}</p>
                    <div className="w-full bg-gray-900 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-white h-full" style={{ width: i === 1 ? '85%' : '65%' }} />
                    </div>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {i === 1 ? 'R$ 1.200' : 'R$ 850'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
