import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from 'next/link';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 bg-secondary/50">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover opacity-5"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="container mx-auto px-4 md:px-6 text-center relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Rediscover the Ancient Script of the Philippines
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
            'Sulatin Mo' is your gateway to learning and translating Tagalog into Baybayin, the beautiful pre-colonial writing system of the Filipino people.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/converter">
                Start Translating
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/guide">
                Explore Characters &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
