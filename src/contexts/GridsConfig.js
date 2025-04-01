
import React from "react";

export const INITIAL_GRIDS = {
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
  }
};

export const LEGENDARY_GRIDS = {
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
