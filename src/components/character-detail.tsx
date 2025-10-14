
"use client";

import { useRef } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type BaybayinCharacter } from "@/lib/baybayin-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Eraser, Pen, BookText } from "lucide-react";
import { HandwritingCanvas, type HandwritingCanvasHandle } from "./handwriting-canvas";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Separator } from "./ui/separator";

export function CharacterDetail({ character }: { character: BaybayinCharacter | null }) {
  const canvasRef = useRef<HandwritingCanvasHandle>(null);

  if (!character) return null;
  
  const handleClearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <>
      <DialogHeader className="text-center">
        <div className="flex justify-center items-baseline gap-4">
            <span className="font-baybayin text-7xl text-primary">{character.char}</span>
            <span className="text-5xl font-headline">{character.name}</span>
        </div>
        <DialogDescription>
          Romanization: {character.roman} | Type: {character.type}
        </DialogDescription>
      </DialogHeader>
      
      <div className="mt-4 max-h-[70vh] overflow-y-auto pr-2">
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-headline">
                    <div className="flex items-center gap-2">
                        <Pen className="h-5 w-5 text-accent" />
                        Practice Writing
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 pt-2">
                        <p className="text-sm text-muted-foreground">
                            Trace the character on the canvas below with your mouse or finger.
                        </p>
                        <div className="flex justify-center">
                        <HandwritingCanvas ref={canvasRef} characterToTrace={character.char} />
                        </div>
                        <Button variant="outline" onClick={handleClearCanvas}>
                        <Eraser className="mr-2 h-4 w-4" />
                        Clear
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                 <AccordionTrigger className="text-xl font-headline">
                    <div className="flex items-center gap-2">
                        <BookText className="h-5 w-5 text-accent" />
                        Examples in Words
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 pt-2">
                        {character.examples.map((ex, index) => (
                            <div key={index}>
                                <div className="grid grid-cols-3 items-center gap-4 text-center">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Tagalog</p>
                                        <p className="text-lg font-bold">{ex.tagalog}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Baybayin</p>
                                        <p className="text-3xl font-baybayin text-primary">{ex.baybayin}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">English</p>
                                        <p className="text-lg italic">"{ex.english}"</p>
                                    </div>
                                </div>
                                {index < character.examples.length - 1 && <Separator className="my-4" />}
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
