import { useState } from "react";
import Intro from "./components/Intro/Intro";
import Home from "./pages/Home/Home";

export default function App() {
  const [showIntro, setShowIntro] =useState(true);
  const [showHome, setShowHome] = useState(false);

  const finishIntro = () => {
    setShowIntro(false);

    setTimeout(() => {
      setShowHome(true);
    }, 150);
  };

  return (
    <>
      {showIntro && <Intro onFinish={finishIntro} />}

      <div
        className={`
          transition-all
          duration-1000
          ${
            showHome
              ? "opacity-100 blur-0"
              : "opacity-0 blur-sm"
          }
        `}
      >
        {showHome && <Home />}
      </div>
    </>
  );
}