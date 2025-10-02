"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type BaybayinCharacter } from "@/lib/baybayin-data";
import { getBaybayinVariation } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, BrainCircuit } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

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

  if (!character) return null;

  return (
    <DialogContent className="max-w-2xl">
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
              <BrainCircuit className="h-5 w-5 text-accent" />
              AI-Powered Variation Finder
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Some Baybayin characters have variations. Enter a Tagalog word to see which variation might be most appropriate.
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
    </DialogContent>
  );
}
