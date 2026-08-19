import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/redefinir-senha")({
  component: RedefinirSenha,
});

function RedefinirSenha() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated via the recovery link
    supabase.auth.onAuthStateChange(async (event) => {
      if (event !== "PASSWORD_RECOVERY") {
        // In a real scenario, you might want to redirect if not in recovery mode
        // but for now we'll allow the session to handle it
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      toast.success("Senha redefinida com sucesso!");
      navigate({ to: "/login" });
    } catch (error: any) {
      toast.error(error.message || "Erro ao redefinir senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-8 font-manrope">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Nova Senha</h2>
          <p className="text-gray-400 text-sm">Digite sua nova senha abaixo.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nova Senha</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redefinindo...
              </>
            ) : (
              "Redefinir Senha"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
