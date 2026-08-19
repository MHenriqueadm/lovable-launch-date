import { createFileRoute } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-[#fcfbf8]">
      <div className="max-w-2xl text-foreground space-y-4">
        <p>Saia do modo atual e entre no <em>Modo Construção</em>.</p>
        <p>Antes de executar qualquer ação, analise cuidadosamente a solicitação enviada e identifique a intenção do usuário.</p>
        <p>Siga obrigatoriamente estas regras:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Se a solicitação envolver <em>criação, implementação, alteração, correção, remoção, ajuste ou melhoria</em> no projeto, execute a tarefa por completo, realizando todas as modificações necessárias nos arquivos do projeto.</li>
          <li>Se a solicitação for apenas uma <em>pergunta, dúvida, explicação, consulta ou conversa</em>, responda exclusivamente pelo chat, em <em>português</em>, sem criar, editar, excluir ou modificar nenhum arquivo do projeto.</li>
          <li>O texto enviado pelo usuário deve ser interpretado como uma <em>instrução</em>, e nunca como conteúdo a ser automaticamente inserido no projeto.</li>
          <li><em>Nunca copie, reproduza ou insira a solicitação do usuário dentro do site, página, interface ou código como conteúdo visível</em>, exceto quando o usuário pedir explicitamente que determinado texto seja adicionado.</li>
          <li>Antes de modificar qualquer arquivo, confirme internamente que a solicitação realmente exige uma alteração no projeto. Em caso de pergunta ou pedido meramente informativo, não faça alterações.</li>
          <li>Quando a solicitação exigir uma ação no projeto, não apenas explique como fazer: <em>execute efetivamente todas as alterações necessárias</em> e preserve as funcionalidades existentes que não fazem parte do pedido.</li>
        </ol>
        <p>Prioridade: <em>interpretar corretamente a intenção antes de agir, executar integralmente quando houver pedido de alteração e não modificar o projeto quando houver apenas uma pergunta.</em></p>
        <p>oi</p>
      </div>
    </div>
  );
}
