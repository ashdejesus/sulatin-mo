
"use client";

import { useState, useEffect, useCallback } from 'react';
import { baybayinCharacters, type BaybayinCharacter } from '@/lib/baybayin-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { shuffle } from '@/lib/utils';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useUser, useFirestore } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { ScoreHistory } from '@/components/sections/score-history';

type QuizQuestion = {
  character: BaybayinCharacter;
  options: string[];
  correctAnswer: string;
};

const NUM_QUESTIONS = 10;

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const generateQuestions = useCallback(() => {
    const shuffledCharacters = shuffle([...baybayinCharacters]);
    const quizCharacters = shuffledCharacters.slice(0, NUM_QUESTIONS);

    const newQuestions = quizCharacters.map((char) => {
      const correctAnswer = char.roman;
      const wrongAnswers = shuffledCharacters
        .filter((c) => c.roman !== correctAnswer)
        .slice(0, 3)
        .map((c) => c.roman);
      
      const options = shuffle([correctAnswer, ...wrongAnswers]);
      
      return {
        character: char,
        options,
        correctAnswer,
      };
    });

    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    startQuiz();
  }, [generateQuestions]);

  const startQuiz = () => {
    generateQuestions();
    setQuizOver(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  }

  const saveScore = useCallback(() => {
    if (user && firestore && questions.length > 0) {
      const resultsColRef = collection(firestore, 'users', user.uid, 'quizResults');
      addDocumentNonBlocking(resultsColRef, {
        score,
        totalQuestions: questions.length,
        createdAt: serverTimestamp(),
      });
    }
  }, [user, firestore, score, questions.length]);

  const handleFinishQuiz = useCallback(() => {
    setQuizOver(true);
    saveScore();
  }, [saveScore]);

  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      handleFinishQuiz();
    }
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section id="quiz" className="w-full py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <Card className="shadow-lg border-border/60">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-headline font-bold text-primary sm:text-4xl">Baybayin Quiz</CardTitle>
                   <CardDescription className="text-muted-foreground">Test your knowledge of the Baybayin script!</CardDescription>
                </CardHeader>
                <CardContent>
                  {quizOver ? (
                    <div className="text-center space-y-6">
                      <h3 className="text-2xl font-semibold">Quiz Complete!</h3>
                      <p className="text-lg text-muted-foreground">
                        You scored <span className="font-bold text-primary">{score}</span> out of {questions.length}.
                      </p>
                      <Button onClick={startQuiz} size="lg">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Play Again
                      </Button>
                    </div>
                  ) : (
                    currentQuestion ? (
                    <div className="space-y-8">
                      <div>
                        <Progress value={progress} className="w-full mb-2" />
                        <div className="flex justify-between text-sm text-muted-foreground text-center">
                            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                            <p>Score: {score}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <p className="text-lg font-semibold">What is the Roman equivalent of this character?</p>
                        <div className="font-baybayin text-8xl text-primary p-8 bg-muted/50 rounded-lg">
                          {currentQuestion.character.char}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {currentQuestion.options.map((option) => (
                          <Button
                            key={option}
                            onClick={() => handleAnswerClick(option)}
                            variant={showFeedback && option === currentQuestion.correctAnswer ? 'default' : (selectedAnswer === option && isCorrect === false) ? 'destructive' : 'outline'}
                            size="lg"
                            className={`h-16 text-lg justify-center transition-all duration-300 ${
                              showFeedback && option !== currentQuestion.correctAnswer ? 'opacity-50' : ''
                            }`}
                            disabled={showFeedback}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                      
                      {showFeedback && (
                        <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                          <div className={`flex items-center text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
                            {isCorrect ? "Correct!" : `The correct answer is ${currentQuestion.correctAnswer}.`}
                          </div>
                          <Button onClick={handleNextQuestion} className="bg-accent text-accent-foreground hover:bg-accent/90">
                            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                    ) : (
                      <div className="text-center text-muted-foreground">Loading questions...</div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {user && <ScoreHistory />}
      </main>
      <Footer />
    </div>
  );
}
