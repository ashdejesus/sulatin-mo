
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook, Twitter } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const communityResources = [
  {
    platform: "Instagram",
    name: "@baybayin",
    description: "Features high-quality photos and videos related to Baybayin.",
    link: "https://www.instagram.com/baybayin/",
    icon: <Instagram className="w-8 h-8 text-accent" />,
  },
  {
    platform: "Instagram",
    name: "@padayon.co",
    description: "An online store that promotes Baybayin and runs community challenges.",
    link: "https://www.instagram.com/padayon.co/",
    icon: <Instagram className="w-8 h-8 text-accent" />,
  },
  {
    platform: "Facebook",
    name: "Baybayin Buhayin",
    description: "An active page promoting learning with updates on lectures and events.",
    link: "https://www.facebook.com/baybayinbuhayin/",
    icon: <Facebook className="w-8 h-8 text-accent" />,
  },
  {
    platform: "Facebook",
    name: "Kristian Kabuay",
    description: "A well-known Baybayin artist and advocate with a significant presence.",
    link: "https://www.facebook.com/kabuay/",
    icon: <Facebook className="w-8 h-8 text-accent" />,
  },
  {
    platform: "TikTok",
    name: "@padayon.co",
    description: "Posts engaging Baybayin content and challenges on TikTok.",
    link: "https://www.tiktok.com/@padayon.co",
    icon: <FaTiktok className="w-8 h-8 text-accent" />,
  },
  {
      platform: "Blog / Artist",
      name: "Arthestic By Jide",
      description: "Shares Baybayin art created using modern digital tools.",
      link: "https://www.instagram.com/arthesticbyjide/",
      icon: <Instagram className="w-8 h-8 text-accent" />,
  }
];

export function CommunityLinks() {
  return (
    <section id="community" className="w-full py-20 md:py-28 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Explore the Community</h2>
          <p className="mt-4 text-muted-foreground">
            Connect with artists, advocates, and learners. Here are some great resources to continue your Baybayin journey.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {communityResources.map((item) => (
            <Card key={item.name} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-headline">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.platform}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80">
                  Follow Link <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
