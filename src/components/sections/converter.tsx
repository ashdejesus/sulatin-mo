"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { tagalogToBaybayin } from "@/lib/transliterate";
import { Copy, Share2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore } from "@/firebase";
import { collection } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { serverTimestamp } from "firebase/firestore";

export function Converter() {
  const [tagalogText, setTagalogText] = useState("");
  const [baybayinText, setBaybayinText] = useState("");
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const handleConvert = () => {
    const result = tagalogToBaybayin(tagalogText);
    setBaybayinText(result);
  };

  const handleCopyToClipboard = () => {
    if (baybayinText) {
      navigator.clipboard.writeText(baybayinText);
      toast({
        title: "Copied to Clipboard",
        description: "Your Baybayin text has been copied.",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share && baybayinText) {
      try {
        await navigator.share({
          title: 'Baybayin Text from Sulatin Mo',
          text: baybayinText,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        toast({
          variant: "destructive",
          title: "Sharing Failed",
          description: "Could not share the text.",
        });
      }
    } else if (baybayinText) {
      handleCopyToClipboard();
      toast({
        title: "Link Copied",
        description: "Sharing not supported, text copied to clipboard instead.",
      });
    }
  };

  const handleSaveTranslation = () => {
    if (!user || !firestore || !tagalogText || !baybayinText) {
      toast({
        variant: "destructive",
        title: "Could not save",
        description: "You must be logged in to save a translation.",
      });
      return;
    }
    const translationsColRef = collection(firestore, 'users', user.uid, 'translations');
    
    addDocumentNonBlocking(translationsColRef, {
      tagalog: tagalogText,
      baybayin: baybayinText,
      createdAt: serverTimestamp(),
    });

    toast({
      title: "Translation Saved",
      description: "Your translation has been saved to your collection.",
    });
  };

  return (
    <section id="converter" className="w-full py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Tagalog to Baybayin Converter</h2>
          <p className="mt-4 text-muted-foreground">
            Type your Tagalog text below and see it magically transformed into the ancient Baybayin script.
          </p>
        </div>
        <div className="mt-12">
          <Card className="shadow-lg border-border/60">
            <CardContent className="p-6 grid gap-6">
              <div className="grid gap-2">
                <label htmlFor="tagalog-input" className="font-semibold text-primary">Your Tagalog Text</label>
                <Textarea
                  id="tagalog-input"
                  placeholder="e.g., Pilipinas"
                  value={tagalogText}
                  onChange={(e) => setTagalogText(e.target.value)}
                  className="min-h-[120px] text-lg bg-background"
                />
              </div>
              <div className="flex justify-center">
                <Button onClick={handleConvert} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Convert to Baybayin
                </Button>
              </div>
              <div className="grid gap-2">
                 <div className="flex justify-between items-center">
                    <label className="font-semibold text-primary">Baybayin Output</label>
                    <div className="flex items-center gap-2">
                      {user && baybayinText && (
                        <Button variant="ghost" size="icon" onClick={handleSaveTranslation} aria-label="Save translation">
                          <Star className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} disabled={!baybayinText} aria-label="Copy to clipboard">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleShare} disabled={!baybayinText} aria-label="Share">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                 </div>
                <div className="min-h-[120px] rounded-md border border-input bg-muted/50 p-4">
                  <p className="text-3xl font-baybayin text-primary whitespace-pre-wrap break-words">
                    {baybayinText || <span className="text-muted-foreground text-lg font-body">Your translation will appear here...</span>}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: This transliteration is a simplified version for educational purposes and may not capture all historical nuances.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
