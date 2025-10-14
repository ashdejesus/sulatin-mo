
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, History, Edit } from "lucide-react";

const learningMaterials = [
    {
        title: "The History of Baybayin",
        description: "Explore the origins and evolution of the ancient script.",
        link: "/#history",
        icon: <History className="h-8 w-8 text-accent" />
    },
    {
        title: "Interactive Character Guide",
        description: "Learn each character, its pronunciation, and see it used in examples.",
        link: "/guide",
        icon: <BookOpen className="h-8 w-8 text-accent" />
    },
    {
        title: "Writing Rules & Nuances",
        description: "Understand the rules of transliteration, including the virama (kudlit). (Coming Soon!)",
        link: "#",
        icon: <Edit className="h-8 w-8 text-muted-foreground" />,
        disabled: true
    }
]

export default function EducationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-headline font-bold text-primary sm:text-5xl">Learning Center</h1>
              <p className="mt-4 text-muted-foreground">
                Your central hub for all educational materials on Baybayin. Start your journey here.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {learningMaterials.map((item) => (
                    <Card key={item.title} className="flex flex-col">
                        <CardHeader className="flex-row items-start gap-4">
                            {item.icon}
                            <div className="flex-1">
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-end">
                            <Button asChild className="w-full" disabled={item.disabled}>
                                <Link href={item.link}>
                                    {item.disabled ? "Coming Soon" : "Start Learning"}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
