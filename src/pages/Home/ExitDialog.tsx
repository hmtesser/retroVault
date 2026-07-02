import { getCurrentWindow } from "@tauri-apps/api/window";

interface Props {
  onCancel: () => void;
}

export default function ExitDialog({ onCancel }: Props) {
  async function fechar() {
    await getCurrentWindow().close();
  }

  return (
    <div className="text-center">

      <h1 className="text-5xl font-bold mb-6">
        Sair
      </h1>

      <p className="text-xl text-gray-300">
        Deseja realmente sair?
      </p>

      <div className="flex justify-center gap-5 mt-10">

        <button
          onClick={fechar}
          className="
            bg-blue-600
            hover:bg-blue-500
            rounded-lg
            px-8
            py-3
            transition
          "
        >
          Sim
        </button>

        <button
          onClick={onCancel}
          className="
            bg-zinc-700
            hover:bg-zinc-600
            rounded-lg
            px-8
            py-3
            transition
          "
        >
          Não
        </button>

      </div>

    </div>
  );
}