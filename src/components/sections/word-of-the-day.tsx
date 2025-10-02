
"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { wordList } from "@/lib/word-of-the-day-data";
import { tagalogToBaybayin } from "@/lib/transliterate";
import { Calendar } from "lucide-react";

export function WordOfTheDay() {
  const getWordForToday = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % wordList.length;
    return wordList[index];
  };

  const dailyWord = useMemo(() => getWordForToday(), []);
  const baybayinWord = useMemo(() => tagalogToBaybayin(dailyWord.tagalog), [dailyWord]);

  return (
    <section id="word-of-the-day" className="w-full py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-lg border-border/60 text-center">
            <CardHeader>
              <div className="flex justify-center items-center gap-2 mb-2">
                <Calendar className="h-6 w-6 text-accent" />
                <CardTitle className="text-3xl font-headline font-bold text-primary sm:text-4xl">Word of the Day</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                A new Tagalog word to learn every day!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-muted/50 rounded-lg">
                <p className="text-4xl font-bold text-primary tracking-wide">{dailyWord.tagalog}</p>
                <p className="text-lg text-muted-foreground mt-1">"{dailyWord.english}"</p>
              </div>
              <div className="p-6 border-t">
                 <p className="text-sm text-muted-foreground mb-2">Baybayin Script</p>
                 <p className="text-5xl font-baybayin text-primary whitespace-pre-wrap break-words">
                   {baybayinWord}
                 </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
