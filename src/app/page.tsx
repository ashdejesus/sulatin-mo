
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { History } from '@/components/sections/history';
import { ModernRevival } from '@/components/sections/modern-revival';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <History />
        <ModernRevival />
      </main>
      <Footer />
    </div>
  );
}
