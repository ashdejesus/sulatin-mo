
"use client";

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit, Timestamp } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

type QuizResult = {
  score: number;
  totalQuestions: number;
  createdAt: Timestamp;
};

export function ScoreHistory() {
  const { user } = useUser();
  const firestore = useFirestore();

  const resultsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'quizResults'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
  }, [user, firestore]);

  const { data: results, isLoading, error } = useCollection<QuizResult>(resultsQuery);

  const formatDate = (timestamp: Timestamp) => {
    return timestamp ? format(timestamp.toDate(), "MMM d, yyyy, h:mm a") : "N/A";
  };

  return (
    <section id="score-history" className="w-full py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold text-primary sm:text-4xl">Your Score History</h2>
          <p className="mt-4 text-muted-foreground">
            Here are your most recent quiz results.
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Recent Scores</CardTitle>
              <CardDescription>Your last 10 quiz attempts.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              )}
              {error && (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Loading History</AlertTitle>
                    <AlertDescription>
                        Could not load your score history. Please try again later.
                    </AlertDescription>
                </Alert>
              )}
              {!isLoading && !error && results && results.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Score</TableHead>
                      <TableHead className="text-center">Percentage</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium text-left">{result.score} / {result.totalQuestions}</TableCell>
                        <TableCell className="text-center">
                          {((result.score / result.totalQuestions) * 100).toFixed(0)}%
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{formatDate(result.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
               {!isLoading && !error && (!results || results.length === 0) && (
                 <div className="text-center py-12">
                    <p className="text-muted-foreground">You haven't completed any quizzes yet.</p>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
