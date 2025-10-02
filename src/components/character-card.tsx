import { Card, CardContent } from "@/components/ui/card";
import { type BaybayinCharacter } from "@/lib/baybayin-data";

type CharacterCardProps = {
  character: BaybayinCharacter;
  onClick: () => void;
};

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
        <div className="text-6xl font-baybayin text-primary">
          {character.char}
        </div>
        <div className="mt-2 text-lg font-semibold tracking-tight">{character.name}</div>
        <div className="text-sm text-muted-foreground">{character.roman}</div>
      </CardContent>
    </Card>
  );
}
