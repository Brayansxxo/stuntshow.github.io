
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/contexts/GameContext";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus } from "lucide-react";

export default function Profile() {
  const { setMenuState, playerName, setPlayerName, playerAvatar, setPlayerAvatar } = useGame();
  const { toast } = useToast();
  const [tempName, setTempName] = useState(playerName);
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = () => {
    if (tempName.trim().length < 3) {
      toast({
        title: "Nombre inválido",
        description: "El nombre debe tener al menos 3 caracteres",
        variant: "destructive"
      });
      return;
    }
    setPlayerName(tempName);
    toast({
      title: "Perfil actualizado",
      description: "Los cambios han sido guardados"
    });
  };

  const handleImageUrlSubmit = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "URL inválida",
        description: "Por favor, ingresa una URL de imagen válida",
        variant: "destructive"
      });
      return;
    }

    // Test if the image URL is valid
    const img = new Image();
    img.onload = () => {
      setPlayerAvatar(imageUrl);
      setImageUrl("");
      toast({
        title: "Avatar actualizado",
        description: "La imagen ha sido establecida como tu avatar"
      });
    };
    img.onerror = () => {
      toast({
        title: "Error",
        description: "No se pudo cargar la imagen. Por favor, verifica la URL",
        variant: "destructive"
      });
    };
    img.src = imageUrl;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Perfil</h2>
        <Button
          onClick={() => setMenuState("main")}
          className="bg-orange-600 hover:bg-orange-700"
        >
          Volver
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Nombre de Usuario</h3>
          <div className="flex gap-4">
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Tu nombre"
              className="flex-1"
            />
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              Guardar
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Avatar</h3>
          
          <div className="flex items-start gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-700">
                <img
                  src={playerAvatar}
                  alt="Avatar actual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">URL de la imagen</label>
                <div className="flex gap-2">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleImageUrlSubmit}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ImagePlus className="w-4 h-4 mr-2" />
                    Establecer
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                <p>• La imagen debe ser cuadrada para mejores resultados</p>
                <p>• Formatos soportados: JPG, PNG, GIF</p>
                <p>• Tamaño recomendado: 256x256 píxeles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
