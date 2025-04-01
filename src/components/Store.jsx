
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { useToast } from "@/components/ui/use-toast";
import { Check, X, Sparkles, Zap, Waves as Wave, Rainbow } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GridPreview = ({ color, name }) => (
  <div className="relative">
    <div className="grid grid-cols-5 gap-1 p-4 bg-gray-800 rounded-lg">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.01 }}
          className={`w-8 h-8 ${color} rounded-md flex items-center justify-center font-bold`}
        >
          {i + 1}
        </motion.div>
      ))}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none rounded-lg" />
  </div>
);

const EffectPreview = ({ effect, isActive }) => {
  const icons = {
    sparkle: <Sparkles className="w-8 h-8" />,
    explosion: <Zap className="w-8 h-8" />,
    wave: <Wave className="w-8 h-8" />,
    rainbow: <Rainbow className="w-8 h-8" />
  };

  return (
    <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
      <motion.div
        animate={isActive ? {
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {icons[effect]}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

const PurchaseDialog = ({ isOpen, onClose, onConfirm, price, item }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
        >
          <h3 className="text-xl font-bold mb-4">¿Deseas comprar {item}?</h3>
          <p className="mb-6">Precio: {price} 💎</p>
          <div className="flex justify-end gap-4">
            <Button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700"
            >
              No
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-green-600 hover:bg-green-700"
            >
              Sí
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const GridCard = ({ name, color, price, unlocked, onPurchase, onSelect, isSelected }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4">
        {name}
      </div>
      
      <div className="p-4">
        <GridPreview color={color} name={name} />
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {unlocked ? (
          <Button
            onClick={onSelect}
            className={`rounded-full w-10 h-10 p-0 ${isSelected ? "bg-green-500" : "bg-gray-600"}`}
          >
            <Check className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            onClick={() => setShowDialog(true)}
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-full flex items-center gap-2 px-4 py-2"
          >
            {price} 💎
          </Button>
        )}
      </div>

      <PurchaseDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={() => {
          setShowDialog(false);
          onPurchase();
        }}
        price={price}
        item={name}
      />
    </motion.div>
  );
};

const EffectCard = ({ name, description, price, unlocked, onPurchase, onSelect, isSelected, effect }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      onHoverStart={() => setIsPreviewActive(true)}
      onHoverEnd={() => setIsPreviewActive(false)}
    >
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4">
        {name}
      </div>
      
      <div className="p-4">
        <EffectPreview effect={effect} isActive={isPreviewActive || isSelected} />
        <p className="text-sm text-gray-300 mt-4">{description}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {unlocked ? (
          <Button
            onClick={onSelect}
            className={`rounded-full w-10 h-10 p-0 ${isSelected ? "bg-green-500" : "bg-gray-600"}`}
          >
            <Check className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            onClick={() => setShowDialog(true)}
            className="bg-purple-500 text-white hover:bg-purple-600 rounded-full flex items-center gap-2 px-4 py-2"
          >
            {price} 💎
          </Button>
        )}
      </div>

      <PurchaseDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={() => {
          setShowDialog(false);
          onPurchase();
        }}
        price={price}
        item={name}
      />
    </motion.div>
  );
};

export default function Store() {
  const { 
    grids, 
    setGrids, 
    effects, 
    setEffects, 
    coins, 
    setCoins, 
    selectedGrid, 
    setSelectedGrid, 
    selectedEffects,
    setSelectedEffects,
    setMenuState 
  } = useGame();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("grids");

  const handlePurchase = (type, key) => {
    const items = type === "grid" ? grids : effects;
    const setItems = type === "grid" ? setGrids : setEffects;
    const item = items[key];

    if (coins >= item.price) {
      setCoins(prev => prev - item.price);
      setItems(prev => ({
        ...prev,
        [key]: { ...item, unlocked: true }
      }));
      toast({
        title: "¡Compra exitosa!",
        description: `Has desbloqueado ${item.name}`,
      });
    } else {
      toast({
        title: "Monedas insuficientes",
        description: "Necesitas más monedas para esta compra",
        variant: "destructive"
      });
    }
  };

  const handleGridSelect = (gridKey) => {
    setSelectedGrid(gridKey);
    toast({
      title: "Cuadrícula seleccionada",
      description: `${grids[gridKey].name} está ahora activa`,
    });
  };

  const handleEffectSelect = (effectKey) => {
    setSelectedEffects(prev => {
      const next = new Set(prev);
      if (next.has(effectKey)) {
        next.delete(effectKey);
      } else {
        next.add(effectKey);
      }
      return next;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setMenuState("main")}
            className="bg-gray-700 hover:bg-gray-600"
          >
            <X className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h2 className="text-3xl font-bold">Tienda</h2>
        </div>
        <div className="text-xl font-bold bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
          {coins} 💎
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="grids">Cuadrículas</TabsTrigger>
          <TabsTrigger value="effects">Efectos Especiales</TabsTrigger>
        </TabsList>

        <TabsContent value="grids">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(grids).map(([key, grid]) => (
              <GridCard
                key={key}
                {...grid}
                onPurchase={() => handlePurchase("grid", key)}
                onSelect={() => handleGridSelect(key)}
                isSelected={selectedGrid === key}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="effects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(effects).map(([key, effect]) => (
              <EffectCard
                key={key}
                {...effect}
                effect={key}
                onPurchase={() => handlePurchase("effect", key)}
                onSelect={() => handleEffectSelect(key)}
                isSelected={selectedEffects.has(key)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
