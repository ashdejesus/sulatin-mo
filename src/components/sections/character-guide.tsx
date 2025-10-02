"use client";

import { useState } from "react";
import { baybayinCharacters, type BaybayinCharacter } from "@/lib/baybayin-data";
import { CharacterCard } from "@/components/character-card";
import { Dialog } from "@/components/ui/dialog";
import { CharacterDetail } from "@/components/character-detail";

export function CharacterGuide() {
  const [selectedCharacter, setSelectedCharacter] = useState<BaybayinCharacter | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleCardClick = (character: BaybayinCharacter) => {
    setSelectedCharacter(character);
    setIsDetailOpen(true);
  };

  const vowels = baybayinCharacters.filter(c => c.type === 'vowel');
  const consonants = baybayinCharacters.filter(c => c.type === 'consonant');

  return (
    <section id="guide" className="w-full py-20 md:py-28 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Interactive Character Guide</h2>
          <p className="mt-4 text-muted-foreground">
            Click on any character to learn more about its pronunciation, usage, and discover variations with our AI tool.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <div>
            <h3 className="text-2xl font-headline font-semibold text-primary mb-6 text-center">Vowels</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-2xl mx-auto">
              {vowels.map((char) => (
                <CharacterCard key={char.roman} character={char} onClick={() => handleCardClick(char)} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-headline font-semibold text-primary mb-6 text-center">Consonants</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {consonants.map((char) => (
                <CharacterCard key={char.roman} character={char} onClick={() => handleCardClick(char)} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <CharacterDetail character={selectedCharacter} />
      </Dialog>
    </section>
  );
}
