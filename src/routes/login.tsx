import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData, authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      await authService.signIn(data);
      toast.success("Login realizado com sucesso!");
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-white font-manrope">
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
          
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">E-mail</label>
              <Input 
                type="email" 
                placeholder="seu@email.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Senha</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••"
                  {...register("password")}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : "Entrar"}
            </Button>
          </form>

          <div className="flex justify-between text-xs text-gray-500">
            <Link to="/esqueci-senha" title="Esqueci minha senha" className="hover:underline">Esqueci minha senha</Link>
            <Link to="/cadastro" title="Cadastre-se" className="hover:underline">Ainda não possui uma conta? Cadastre-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
