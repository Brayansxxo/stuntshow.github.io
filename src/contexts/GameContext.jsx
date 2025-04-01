
import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

const INITIAL_GRIDS = {
  default: {
    name: "Cuadrícula Clásica",
    unlocked: true,
    price: 0,
    color: "bg-blue-600"
  },
  white: {
    name: "Blanco Elegante",
    unlocked: false,
    price: 100,
    color: "bg-white text-black"
  },
  red: {
    name: "Rojo Fuego",
    unlocked: false,
    price: 100,
    color: "bg-red-500"
  },
  purple: {
    name: "Púrpura Real",
    unlocked: false,
    price: 100,
    color: "bg-purple-500"
  },
  rainbow: {
    name: "Arcoíris Dinámico",
    unlocked: false,
    price: 150,
    color: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"
  },
  galaxy: {
    name: "Galaxia Mística",
    unlocked: false,
    price: 150,
    color: "bg-gradient-to-r from-purple-900 via-indigo-500 to-purple-300"
  },
  fire: {
    name: "Llamas Infernales",
    unlocked: false,
    price: 150,
    color: "bg-gradient-to-t from-red-700 via-orange-500 to-yellow-300"
  },
  ice: {
    name: "Hielo Eterno",
    unlocked: false,
    price: 150,
    color: "bg-gradient-to-b from-blue-300 via-cyan-400 to-white"
  },
  aurora: {
    name: "Aurora Boreal",
    unlocked: false,
    price: 150,
    color: "bg-gradient-to-r from-green-400 via-teal-500 to-blue-500"
  },
  sunset: {
    name: "Atardecer",
    unlocked: false,
    price: 150,
    color: "bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600"
  },
  ocean: {
    name: "Profundidades",
    unlocked: false,
    price: 150,
    color: "bg-gradient-to-b from-blue-800 via-blue-600 to-cyan-400"
  },
  forest: {
    name: "Bosque Místico",
    unlocked: false,
    price: 150,
    color: "bg-gradient-to-r from-green-800 via-green-500 to-emerald-300"
  },
  dragon: {
    name: "Dragón",
    unlocked: false,
    price: 2000,
    color: "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400",
    legendary: true,
    effects: {
      click: "dragon-breath",
      start: "dragon-roar",
      complete: "dragon-victory"
    }
  },
  unicorn: {
    name: "Unicornio",
    unlocked: false,
    price: 2000,
    color: "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400",
    legendary: true,
    effects: {
      click: "rainbow-trail",
      start: "magical-sparkles",
      complete: "rainbow-explosion"
    }
  },
  fireRider: {
    name: "Jinete de Fuego",
    unlocked: false,
    price: 2000,
    color: "bg-gradient-to-br from-red-700 via-orange-600 to-yellow-500",
    legendary: true,
    effects: {
      click: "flame-hoofprint",
      start: "flame-circle",
      complete: "inferno-burst"
    }
  },
  megalodon: {
    name: "Megalodón",
    unlocked: false,
    price: 2000,
    color: "bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400",
    legendary: true,
    effects: {
      click: "water-splash",
      start: "ocean-wave",
      complete: "tidal-surge"
    }
  },
  serpent: {
    name: "Serpiente Gigantesca Terrorífica",
    unlocked: false,
    price: 2000,
    color: "bg-gradient-to-r from-green-900 via-green-600 to-emerald-400",
    legendary: true,
    effects: {
      click: "venom-splash",
      start: "snake-hiss",
      complete: "poison-cloud"
    }
  }
};

const INITIAL_EFFECTS = {
  sparkle: {
    name: "Destellos Mágicos",
    description: "Añade brillos y destellos al hacer clic",
    unlocked: false,
    price: 500
  },
  explosion: {
    name: "Explosión de Poder",
    description: "Crea una explosión de energía al acertar",
    unlocked: false,
    price: 500
  },
  wave: {
    name: "Onda Expansiva",
    description: "Genera una onda que se expande al tocar",
    unlocked: false,
    price: 500
  },
  rainbow: {
    name: "Rastro Arcoíris",
    description: "Deja un rastro de colores al mover el cursor",
    unlocked: false,
    price: 500
  }
};

const DIFFICULTY_TIMES = {
  principiante: 60,
  amateur: 45,
  profesional: 30,
  leyenda: 20,
  top: 15
};

const SUMAMOS_SPEEDS = {
  principiante: 2500,
  amateur: 2000,
  profesional: 1500,
  leyenda: 1000,
  top: 800
};

const EXTREME_SPEEDS = {
  principiante: 3000,
  amateur: 2500,
  profesional: 2000,
  leyenda: 1500,
  top: 1000
};

const ROBLOX_AVATARS = [
  "/avatars/pelotocino.png",
  "/avatars/roblox2.png",
  "/avatars/roblox3.png",
  "/avatars/roblox4.png",
  "/avatars/roblox5.png",
  "/avatars/roblox6.png",
  "/avatars/roblox7.png",
  "/avatars/roblox8.png",
  "/avatars/roblox9.png",
  "/avatars/roblox10.png"
];

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

function GameProvider({ children }) {
  const [gameMode, setGameMode] = useState("menu");
  const [menuState, setMenuState] = useState("main");
  const [aiDifficulty, setAiDifficulty] = useState("principiante");
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem("coins");
    return saved ? parseInt(saved) : 0;
  });
  const [grids, setGrids] = useState(() => {
    const saved = localStorage.getItem("grids");
    return saved ? JSON.parse(saved) : INITIAL_GRIDS;
  });
  const [effects, setEffects] = useState(() => {
    const saved = localStorage.getItem("effects");
    return saved ? JSON.parse(saved) : INITIAL_EFFECTS;
  });
  const [selectedGrid, setSelectedGrid] = useState(() => {
    const saved = localStorage.getItem("selectedGrid");
    return saved || "default";
  });
  const [selectedEffects, setSelectedEffects] = useState(() => {
    const saved = localStorage.getItem("selectedEffects");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [resolution, setResolution] = useState(() => {
    const saved = localStorage.getItem("resolution");
    return saved || "1920x1080";
  });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });
  const [gridSize, setGridSize] = useState(() => {
    const saved = localStorage.getItem("gridSize");
    return saved ? parseInt(saved) : 16;
  });
  const [personalBests, setPersonalBests] = useState(() => {
    const saved = localStorage.getItem("personalBests");
    return saved ? JSON.parse(saved) : {
      normal: Infinity,
      competitive: Infinity,
      sumamos: Infinity,
      contrarreloj: Infinity,
      mirror: Infinity,
      extreme: Infinity
    };
  });
  const [playerName, setPlayerName] = useState(() => {
    const saved = localStorage.getItem("playerName");
    return saved || "Jugador";
  });
  const [playerAvatar, setPlayerAvatar] = useState(() => {
    const saved = localStorage.getItem("playerAvatar");
    return saved || ROBLOX_AVATARS[0];
  });
  const [globalRanking, setGlobalRanking] = useState(() => {
    const saved = localStorage.getItem("globalRanking");
    return saved ? JSON.parse(saved).filter(player => player.isReal) : [];
  });

  useEffect(() => {
    localStorage.setItem("coins", coins);
    localStorage.setItem("grids", JSON.stringify(grids));
    localStorage.setItem("effects", JSON.stringify(effects));
    localStorage.setItem("selectedGrid", selectedGrid);
    localStorage.setItem("selectedEffects", JSON.stringify(Array.from(selectedEffects)));
    localStorage.setItem("resolution", resolution);
    localStorage.setItem("theme", theme);
    localStorage.setItem("gridSize", gridSize);
    localStorage.setItem("personalBests", JSON.stringify(personalBests));
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerAvatar", playerAvatar);
    localStorage.setItem("globalRanking", JSON.stringify(globalRanking));
  }, [coins, grids, effects, selectedGrid, selectedEffects, resolution, theme, gridSize, personalBests, playerName, playerAvatar, globalRanking]);

  const value = {
    gameMode,
    setGameMode,
    menuState,
    setMenuState,
    aiDifficulty,
    setAiDifficulty,
    coins,
    setCoins,
    grids,
    setGrids,
    effects,
    setEffects,
    selectedGrid,
    setSelectedGrid,
    selectedEffects,
    setSelectedEffects,
    resolution,
    setResolution,
    theme,
    setTheme,
    gridSize,
    setGridSize,
    personalBests,
    setPersonalBests,
    playerName,
    setPlayerName,
    playerAvatar,
    setPlayerAvatar,
    globalRanking,
    setGlobalRanking,
    DIFFICULTY_TIMES,
    SUMAMOS_SPEEDS,
    EXTREME_SPEEDS,
    ROBLOX_AVATARS
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export default GameProvider;
