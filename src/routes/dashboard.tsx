import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { TenantGuard } from "@/components/auth/TenantGuard";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Scissors
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";
import { useBarbershop } from "@/contexts/BarbershopContext";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { profile } = useAuth();
  const { barbershop } = useBarbershop();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      toast.success("Logout realizado");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Erro ao sair");
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Visão Geral", path: "/dashboard" },
    { icon: Calendar, label: "Agenda", path: "/dashboard/agenda" },
    { icon: Users, label: "Clientes", path: "/dashboard/clientes" },
    { icon: Scissors, label: "Serviços", path: "/dashboard/servicos" },
    { icon: Settings, label: "Configurações", path: "/dashboard/configuracoes" },
  ];

  return (
    <AuthGuard>
      <TenantGuard>
        <div className="min-h-screen bg-[#0a0a0a] text-white flex font-manrope">
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            fixed md:static inset-y-0 left-0 z-50 w-64 bg-black border-r border-gray-900 
            transition-transform duration-300 md:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="h-full flex flex-col p-6">
              <div className="flex items-center gap-2 mb-8 px-2">
                <Scissors className="h-6 w-6 text-white" />
                <span className="font-bold text-xl tracking-tight">RESTYLE</span>
              </div>

              <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.path}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="pt-6 border-t border-gray-900 space-y-4">
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Barbearia</p>
                  <p className="text-sm text-white font-medium truncate">{barbershop?.name || "Carregando..."}</p>
                </div>
                
                <div className="px-3 py-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold">
                    {profile?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{profile?.name || "Usuário"}</p>
                    <p className="text-xs text-gray-500 truncate">{profile?.phone || "Sem telefone"}</p>
                  </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">Sair</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <header className="h-16 border-b border-gray-900 flex items-center justify-between px-6 bg-black/50 backdrop-blur-sm sticky top-0 z-30">
              <button 
                className="md:hidden text-gray-400 hover:text-white"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              
              <div className="flex-1 md:flex-none" />
              
              <div className="flex items-center gap-4">
                <span className="text-xs px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400 font-medium">
                  Modo Admin
                </span>
              </div>
            </header>

            <div className="p-6 overflow-y-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </TenantGuard>
    </AuthGuard>
  );
}
