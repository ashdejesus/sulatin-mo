
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, History, Edit, Youtube } from "lucide-react";

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
];

const videoLessons = [
    {
        title: "Baybayin 101",
        description: "From Marmade PH: A great starting point for beginners.",
        embedUrl: "https://www.youtube.com/embed/ddghRtW9LpE"
    },
    {
        title: "3 Easy Steps to Learn Baybayin",
        description: "From Tales of Demi: A tutorial by ANAKNIRIZAL.",
        embedUrl: "https://www.youtube.com/embed/oLwj1ZYw3vA"
    },
    {
        title: "The Simplicity of the Original Filipino Script",
        description: "From Samuel Heinrich: A clear explanation of the script's structure.",
        embedUrl: "https://www.youtube.com/embed/NE7mwkPdV04"
    },
    {
        title: "Introduction to Baybayin in 2 1/2 Minutes",
        description: "From Miguel Lorenzo Singian: A very quick overview.",
        embedUrl: "https://www.youtube.com/embed/icg7T17HfB8"
    }
];

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

        <section className="w-full py-20 md:py-28 lg:py-32 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="mx-auto max-w-3xl text-center">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <Youtube className="h-10 w-10 text-accent" />
                        <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Video Lessons</h2>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                        Watch these tutorials and deep dives to improve your understanding of Baybayin.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
                    {videoLessons.map((video) => (
                        <Card key={video.title}>
                             <CardHeader>
                                <CardTitle>{video.title}</CardTitle>
                                <CardDescription>{video.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video overflow-hidden rounded-lg border">
                                    <iframe 
                                        className="w-full h-full"
                                        src={video.embedUrl} 
                                        title={video.title}
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen>
                                    </iframe>
                                </div>
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
