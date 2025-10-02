
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { History } from '@/components/sections/history';
import { ModernRevival } from '@/components/sections/modern-revival';
import { CommunityLinks } from '@/components/sections/community-links';
import { WordOfTheDay } from '@/components/sections/word-of-the-day';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WordOfTheDay />
        <History />
        <ModernRevival />
        <CommunityLinks />
      </main>
      <Footer />
    </div>
  );
}
