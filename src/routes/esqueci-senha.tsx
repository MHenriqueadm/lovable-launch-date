import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/esqueci-senha")({
  component: EsqueciSenha,
});

function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Informe seu e-mail");
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(email);
      toast.success("E-mail de recuperação enviado! Verifique sua caixa de entrada.");
      navigate({ to: "/login" });
    } catch (error: any) {
      toast.error(error.message || "Erro ao solicitar recuperação de senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-8 font-manrope">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-center">Recuperar Senha</h2>
          <p className="text-gray-400 text-sm text-center">
            Informe seu e-mail para receber as instruções de recuperação.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">E-mail</label>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar e-mail de recuperação"
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500">
          <Link to="/login" className="hover:underline">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}
