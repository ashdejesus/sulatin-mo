"use client";

import { useRef } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type BaybayinCharacter } from "@/lib/baybayin-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Eraser, Pen } from "lucide-react";
import { HandwritingCanvas, type HandwritingCanvasHandle } from "./handwriting-canvas";

export function CharacterDetail({ character }: { character: BaybayinCharacter | null }) {
  const canvasRef = useRef<HandwritingCanvasHandle>(null);

  if (!character) return null;
  
  const handleClearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-4">
          <span className="font-baybayin text-6xl text-primary">{character.char}</span>
          <span className="text-4xl font-headline">{character.name}</span>
        </DialogTitle>
        <DialogDescription>
          Romanization: {character.roman} | Type: {character.type}
        </DialogDescription>
      </DialogHeader>
      
      <div className="mt-4">
        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <Pen className="h-5 w-5 text-accent" />
              Practice Writing
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Trace the character on the canvas below with your mouse or finger.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <HandwritingCanvas ref={canvasRef} characterToTrace={character.char} />
            </div>
            <Button variant="outline" onClick={handleClearCanvas}>
              <Eraser className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );
}
