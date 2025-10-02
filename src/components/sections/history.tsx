import { summarizeBaybayinHistory } from "@/ai/flows/summarize-baybayin-history";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

async function getHistorySummary() {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-api-key-here') {
    return { summary: null, error: "AI features are disabled. Please configure your Gemini API key in the .env file to see the history of Baybayin." };
  }
  try {
    const { summary } = await summarizeBaybayinHistory({ query: 'Summarize the history of Baybayin, its origins, use during the pre-colonial and Spanish eras, its decline, and modern revival. Format the output as a single string with paragraphs separated by \\n\\n.' });
    return { summary, error: null };
  } catch (e) {
    console.error(e);
    return { summary: null, error: "Could not load the history summary. Please check your Gemini API key." };
  }
}

export async function History() {
  const historyImage = PlaceHolderImages.find(p => p.id === 'history-illustration');
  const { summary, error } = await getHistorySummary();

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
                  {summary ? (
                    <div className="prose prose-lg max-w-none text-foreground/90 prose-headings:font-headline prose-headings:text-primary">
                      {summary.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Content not available</AlertTitle>
                      <AlertDescription>
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}