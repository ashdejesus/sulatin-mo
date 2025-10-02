import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const historySummary = `Baybayin, which means "to spell" in Tagalog, is an ancient script used in the Philippines before the arrival of the Spanish. It's a member of the Brahmic family of scripts and was used to write Tagalog and other Philippine languages. Its origins can be traced back to the Kawi script of Java, Bali, and Sumatra.

During the pre-colonial era, Baybayin was used for personal correspondence, poetry, and public announcements. It was written on bamboo, bark, and leaves. When the Spanish arrived in the 16th century, they were surprised to find a high literacy rate among the Filipinos. For a time, they even used Baybayin for religious instruction.

However, as the Latin alphabet was introduced and became more widespread through the Spanish education system, the use of Baybayin declined. By the 18th century, it had almost completely disappeared from common use, preserved only by a few communities and antiquarians.

In recent years, there has been a significant resurgence of interest in Baybayin. It has become a symbol of national pride and cultural identity. Many young Filipinos are learning the script, and it is seeing a revival in art, design, and even tattoos. This modern revival is a testament to the enduring spirit of Filipino heritage.`;

export async function History() {
  const historyImage = PlaceHolderImages.find(p => p.id === 'history-illustration');

  return (
    <section id="history" className="w-full py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">The Story of Baybayin</h2>
          <p className="mt-4 text-muted-foreground">
            A brief journey through the rich history of the Philippines' ancient script.
          </p>
        </div>
        <div className="mt-12">
          <Card className="shadow-lg border-border/60 overflow-hidden">
            <div className="grid md:grid-cols-5">
              {historyImage && (
                <div className="md:col-span-2 relative min-h-[250px] md:min-h-0">
                  <Image
                    src={historyImage.imageUrl}
                    alt={historyImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={historyImage.imageHint}
                  />
                </div>
              )}
              <div className="md:col-span-3">
                <CardContent className="p-8 md:p-10">
                    <div className="prose prose-lg max-w-none text-foreground/90 prose-headings:font-headline prose-headings:text-primary">
                      {historySummary.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
