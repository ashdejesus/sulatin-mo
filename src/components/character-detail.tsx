"use client";

import { useRef, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type BaybayinCharacter } from "@/lib/baybayin-data";
import { getAudioForText } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Volume2, Eraser, Pen } from "lucide-react";
import { HandwritingCanvas, type HandwritingCanvasHandle } from "./handwriting-canvas";

export function CharacterDetail({ character }: { character: BaybayinCharacter | null }) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HandwritingCanvasHandle>(null);

  if (!character) return null;
  
  const handlePlayAudio = async () => {
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.play();
      return;
    }

    setIsPlaying(true);
    const newAudioSrc = await getAudioForText(character.name);
    setIsPlaying(false);

    if (newAudioSrc) {
      setAudioSrc(newAudioSrc);
      const audio = new Audio(newAudioSrc);
      audio.play();
    }
  };
  
  const handleClearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-4">
          <span className="font-baybayin text-6xl text-primary">{character.char}</span>
          <span className="text-4xl font-headline">{character.name}</span>
           <Button variant="ghost" size="icon" onClick={handlePlayAudio} disabled={isPlaying}>
            <Volume2 className="h-6 w-6" />
            <span className="sr-only">Play pronunciation</span>
          </Button>
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
