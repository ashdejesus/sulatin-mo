import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Converter } from '@/components/sections/converter';
import { CharacterGuide } from '@/components/sections/character-guide';
import { History } from '@/components/sections/history';
import { ModernRevival } from '@/components/sections/modern-revival';
import { Quiz } from '@/components/sections/quiz';
import { SavedTranslations } from '@/components/sections/saved-translations';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Converter />
        <SavedTranslations />
        <CharacterGuide />
        <History />
        <ModernRevival />
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}
