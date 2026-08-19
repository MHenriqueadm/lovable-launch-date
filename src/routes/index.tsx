import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#0a0a0a] text-white">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-5xl font-bold tracking-tighter">RESTYLE</h1>
          <p className="text-zinc-400 text-xl font-medium">Modo Construção Ativo</p>
        </header>

        <main className="grid gap-6 text-sm leading-relaxed text-zinc-300">
          <section className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg space-y-4">
            <h2 className="text-lg font-semibold text-white">Regras de Execução</h2>
            <ol className="list-decimal list-inside space-y-3">
              <li>Se a solicitação envolver <em className="text-white not-italic">criação, implementação, alteração, correção, remoção, ajuste ou melhoria</em> no projeto, execute a tarefa por completo.</li>
              <li>Se a solicitação for apenas uma <em className="text-white not-italic">pergunta, dúvida, explicação, consulta ou conversa</em>, responda exclusivamente pelo chat, em português.</li>
              <li>O texto enviado pelo usuário deve ser interpretado como uma <em className="text-white not-italic">instrução</em>, e nunca como conteúdo a ser inserido no projeto.</li>
              <li><em className="text-white not-italic">Nunca copie ou insira a solicitação do usuário</em> dentro do código como conteúdo visível, exceto se solicitado explicitamente.</li>
              <li>Antes de modificar qualquer arquivo, confirme que a solicitação realmente exige uma alteração.</li>
              <li>Execute efetivamente todas as alterações necessárias e preserve as funcionalidades existentes.</li>
            </ol>
            <p className="pt-2 font-semibold text-white italic">
              Prioridade: interpretar corretamente a intenção antes de agir, executar integralmente quando houver pedido de alteração e não modificar o projeto quando houver apenas uma pergunta.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg space-y-3">
              <h2 className="text-lg font-semibold text-white italic underline">Checklist de Fundação</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Adicionar .env e .env.* ao .gitignore</li>
                <li>Criar .env.example sem valores reais</li>
                <li>Revisar RLS da tabela <code className="bg-black px-1 rounded">profiles</code> (auth.uid() = id)</li>
                <li>Revisar leitura pública de <code className="bg-black px-1 rounded">barbershops</code> por slug</li>
              </ul>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg space-y-3">
              <h2 className="text-lg font-semibold text-white">Regras de Schema</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><code className="text-white">barbershops.id</code> = UUID</li>
                <li><code className="text-white">barbershops.slug</code> = texto</li>
                <li><code className="text-white">barbershop_users.barbershop_id</code> = UUID</li>
              </ul>
            </div>
          </section>
        </main>

        <footer className="text-center text-zinc-500 text-xs">
          Execute o build e sincronize com o GitHub após as correções.
        </footer>
      </div>
    </div>
  );
}