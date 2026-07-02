import { useEffect, useState } from "react";

type Props = {
  onFinish: () => void;
};

export default function Intro2({ onFinish }: Props) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const t2 = setTimeout(() => {
      onFinish();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={`
      fixed inset-0
      flex items-center justify-center
      transition-all duration-1000
      ${fadeOut ? "bg-black" : "bg-gray-100"}
    `}
    >
      <h1
        className={`
        text-7xl font-black tracking-wide
        transition-all duration-1000
        ${
          fadeOut
            ? "opacity-0 scale-95 text-white"
            : "opacity-100 scale-100 text-blue-600"
        }
      `}
      >
        RetroVault
      </h1>
    </div>
  );
}