import { useEffect, useState } from "react";

type Props = {
  onFinish: () => void;
};

export default function Intro({ onFinish }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);   // fade in
    const t2 = setTimeout(() => setPhase(2), 1800);  // fade out
    const t3 = setTimeout(onFinish, 3000);           // termina

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div
      className={`
        fixed inset-0
        flex items-center justify-center
        transition-colors duration-[1200ms]
        ${phase === 2 ? "bg-black" : "bg-gray-100"}
      `}
    >
    <h1
    className={`
        text-8xl
        font-black
        tracking-[.35em]
        transition-all
        duration-[1200ms]

        ${
            phase === 0
                ? "opacity-0 scale-75"
                : phase === 1
                ? "opacity-100 scale-100"
                : "opacity-0 scale-125"
        }

        bg-gradient-to-r
        from-blue-400
        via-blue-500
        to-cyan-300

        bg-clip-text
        text-transparent
    `}
>
    RetroVault
</h1>
    </div>
  );
}