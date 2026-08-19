import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$slug/agendar")({
  component: PublicBooking,
});

function PublicBooking() {
  const { slug } = Route.useParams();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg space-y-8 text-center">
        <h1 className="text-3xl font-bold">Agendamento Online</h1>
        <div className="p-12 border border-dashed border-gray-800 rounded-2xl">
          <p className="text-gray-500 font-mono">/{slug}</p>
        </div>
      </div>
    </div>
  );
}
