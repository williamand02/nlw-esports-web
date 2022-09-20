/* eslint-disable import/first */
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import GameBanner from "./components/GameBanner";
import CreateAdBanner from "./components/CreateAdBanner";

import { Games } from "./interfaces/Games";
import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esports.svg";
import CreateAdModal from "./components/Form/CreateAdModal";
import axios from "axios";

function App() {
  const [games, setGames] = useState<Games>([]);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    axios(`${baseUrl}/games`).then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu
        <span className="text-transparent bg-clip-text bg-nlw-gradient">
          {" duo "}
        </span>
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
