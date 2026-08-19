import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r border-gray-900 hidden md:flex flex-col p-6 space-y-6">
        <h1 className="text-xl font-bold tracking-tight">RESTYLE</h1>
        <nav className="space-y-1">
          {['Início', 'Agenda', 'Clientes', 'Comunicação', 'Serviços', 'Financeiro', 'Barbeiros', 'Relatórios', 'Configurações'].map(item => (
            <div key={item} className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-900 rounded-md cursor-pointer transition-colors">
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-gray-900 flex items-center px-6">
          <div className="flex-1"></div>
          <div className="w-8 h-8 rounded-full bg-gray-800"></div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}