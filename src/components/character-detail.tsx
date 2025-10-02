"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type BaybayinCharacter } from "@/lib/baybayin-data";
import { getBaybayinVariation, getAudioForText } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, BrainCircuit, Volume2, Eraser, Pen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { HandwritingCanvas, type HandwritingCanvasHandle } from "./handwriting-canvas";
import { Separator } from "./ui/separator";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? "Generating..." : "Find Variation"}
    </Button>
  );
}

export function CharacterDetail({ character }: { character: BaybayinCharacter | null }) {
  const initialState = { errors: null, variation: null, explanation: null };
  const [state, dispatch] = useActionState(getBaybayinVariation, initialState);
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
    <DialogContent className="max-w-4xl">
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
      
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-headline">
                <BrainCircuit className="h-5 w-5 text-accent" />
                AI-Powered Variation Finder
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter a Tagalog word to see which variation might be most appropriate for the context.
              </p>
            </CardHeader>
            <CardContent>
              <form action={dispatch} className="space-y-4">
                <input type="hidden" name="baybayinCharacter" value={character.char} />
                <div className="space-y-2">
                  <Input name="tagalogWord" placeholder="e.g., 'mabuti'" required />
                   {state.errors?.tagalogWord && (
                    <p className="text-sm font-medium text-destructive">{state.errors.tagalogWord}</p>
                  )}
                </div>
                <SubmitButton />
              </form>
              {state?.errors?._form && (
                 <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.errors._form}</AlertDescription>
                </Alert>
              )}
              {state?.variation && (
                <div className="mt-6 animate-in fade-in space-y-4">
                  <h4 className="font-semibold text-primary">Suggested Variation:</h4>
                  <div className="rounded-lg bg-muted p-4 text-center">
                      <span className="font-baybayin text-5xl text-primary">{state.variation}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{state.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
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
              <HandwritingCanvas ref={canvasRef} characterToTrace={character.char} />
              <Button variant="outline" onClick={handleClearCanvas}>
                <Eraser className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  );
}
