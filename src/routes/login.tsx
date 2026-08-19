import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-white">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center p-12 border-r border-gray-900">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Gestão inteligente para barbearias que querem crescer.</h1>
          <p className="text-gray-400">Organize agenda, clientes, equipe e resultados em um só lugar.</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• Agendamentos simplificados</li>
            <li>• Controle financeiro e operacional</li>
            <li>• Gestão completa da equipe</li>
          </ul>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Bem-vindo de volta</h2>
            <p className="text-gray-400 text-sm">Acesse sua conta para continuar.</p>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">E-mail</label>
              <input type="email" className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md focus:ring-2 focus:ring-gray-700 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Senha</label>
              <input type="password" className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md focus:ring-2 focus:ring-gray-700 outline-none" />
            </div>
            <button className="w-full py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors">Entrar</button>
          </form>

          <div className="flex justify-between text-xs text-gray-500">
            <a href="#" className="hover:underline">Esqueci minha senha</a>
            <a href="#" className="hover:underline">Ainda não possui uma conta? Cadastre-se</a>
          </div>
        </div>
      </div>
    </div>
  );
}