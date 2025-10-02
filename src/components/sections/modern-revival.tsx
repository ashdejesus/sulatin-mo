
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Smartphone, GraduationCap, Shirt, ScrollText, Users } from "lucide-react";

const revivalItems = [
  {
    title: "Digital Technologies",
    description: "Mobile apps, websites, and typefaces for Baybayin fonts make learning accessible to everyone.",
    imageId: "modern-revival-digital",
    link: "https://sulatin-mo.vercel.app/",
    icon: <Smartphone className="w-8 h-8 text-accent" />,
  },
  {
    title: "Education",
    description: "Integration into Filipino and Araling Panlipunan subjects in schools helps younger generations connect with their heritage.",
    imageId: "modern-revival-education",
    link: "https://youtu.be/oLwj1ZYw3vA?si=5FDq2w_KoiUO29VO",
    icon: <GraduationCap className="w-8 h-8 text-accent" />,
  },
  {
    title: "Design and Fashion",
    description: "Baybayin is used in t-shirts, tattoos, signage, and logos, bringing the script into modern aesthetics.",
    imageId: "modern-revival-fashion",
    link: "https://www.wearlegazy.com/",
    icon: <Shirt className="w-8 h-8 text-accent" />,
  },
  {
    title: "Government Efforts",
    description: "Bills propose including Baybayin in official communication and signage to increase its visibility.",
    imageId: "modern-revival-government",
    link: "https://legacy.senate.gov.ph/press_release/2018/0423_prib1.asp",
    icon: <ScrollText className="w-8 h-8 text-accent" />,
  },
  {
    title: "Social Media",
    description: "Campaigns raise awareness and teach how to read and write Baybayin, creating a vibrant online community.",
    imageId: "modern-revival-social",
    link: "https://www.facebook.com/groups/baybayin/",
    icon: <Users className="w-8 h-8 text-accent" />,
  },
];

export function ModernRevival() {
  return (
    <section id="revival" className="w-full py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Baybayin's Modern Revival</h2>
          <p className="mt-4 text-muted-foreground">
            The ancient script is finding new life in the modern world through various cultural and technological efforts.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {revivalItems.map((item) => {
            const image = PlaceHolderImages.find((p) => p.id === item.imageId);
            return (
              <Card key={item.title} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-headline">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80">
                    Learn More <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
