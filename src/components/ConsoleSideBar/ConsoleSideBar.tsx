interface Props {
  consoles: string[];
  selected: number;
  onSelect: (index: number) => void;
}

export default function ConsoleSidebar({
  consoles,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="w-56 bg-[#0b0f17] border-r border-gray-800 p-4">

      <h2 className="mb-5 text-xl font-bold">
        Consoles
      </h2>

      {consoles.map((consoleName, index) => (
        <div
          key={consoleName}
          onClick={() => onSelect(index)}
          className={`
            mb-2
            cursor-pointer
            rounded-lg
            p-3
            transition-all
            duration-150

            ${
              index === selected
                ? "bg-blue-600 scale-105 text-white"
                : "text-gray-400 hover:bg-[#1b2230]"
            }
          `}
        >
          {consoleName}
        </div>
      ))}
    </div>
  );
}