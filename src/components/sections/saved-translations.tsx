
"use client";

import { useState } from "react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit, doc } from "firebase/firestore";
import { deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SavedTranslations() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const translationsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'translations'),
      orderBy('createdAt', 'desc'),
      limit(20) // Increased limit to show more items
    );
  }, [user, firestore]);

  const { data: translations, isLoading, error } = useCollection<{tagalog: string, baybayin: string}>(translationsQuery);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
    });
  };

  const handleDeleteTranslation = (translationId: string) => {
    if (!user || !firestore) return;
    const docRef = doc(firestore, 'users', user.uid, 'translations', translationId);
    deleteDocumentNonBlocking(docRef);
    toast({
      title: "Translation Removed",
      description: "The translation has been removed from your collection.",
    });
  };

  return (
    <section id="saved" className="w-full py-20 md:py-28 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Your Saved Translations</h2>
          <p className="mt-4 text-muted-foreground">
            Here are your most recently saved translations.
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>My Collection</CardTitle>
              <CardDescription>Click to copy or remove your saved items.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {error && (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Loading Translations</AlertTitle>
                    <AlertDescription>
                        Could not load your saved translations. Please try again later.
                    </AlertDescription>
                </Alert>
              )}
              {!isLoading && !error && translations && translations.length > 0 && (
                <div className="space-y-4">
                  {translations.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-md bg-background/50 hover:bg-background transition-colors">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{item.tagalog}</p>
                        <p className="text-2xl font-baybayin text-primary">{item.baybayin}</p>
                      </div>
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(item.baybayin)} aria-label="Copy translation">
                          <Copy className="h-5 w-5 text-muted-foreground" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Remove translation">
                              <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this
                                translation from your collection.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteTranslation(item.id)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
               {!isLoading && !error && (!translations || translations.length === 0) && (
                 <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">You haven't saved any translations yet.</p>
                    <Button asChild>
                        <Link href="#converter">Make a Translation</Link>
                    </Button>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
