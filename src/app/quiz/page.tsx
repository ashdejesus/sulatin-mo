
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type QuizQuestion = {
  character: BaybayinCharacter;
  options: string[];
  correctAnswer: string;
};

type CharacterType = 'all' | 'vowels' | 'consonants';

const MAX_ATTEMPTS = 2;

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const { user } = useUser();
  const firestore = useFirestore();

  // Quiz settings state
  const [quizStarted, setQuizStarted] = useState(false);
  const [numQuestions, setNumQuestions] = useState('10');
  const [charType, setCharType] = useState<CharacterType>('all');

  const generateQuestions = useCallback(() => {
    let sourceCharacters: BaybayinCharacter[];
    if (charType === 'vowels') {
      sourceCharacters = baybayinCharacters.filter(c => c.type === 'vowel');
    } else if (charType === 'consonants') {
      sourceCharacters = baybayinCharacters.filter(c => c.type === 'consonant');
    } else {
      sourceCharacters = [...baybayinCharacters];
    }
    
    const questionCount = numQuestions === 'all' ? sourceCharacters.length : parseInt(numQuestions);

    const shuffledCharacters = shuffle(sourceCharacters);
    const quizCharacters = shuffledCharacters.slice(0, questionCount);

    if (quizCharacters.length < 4 && quizCharacters.length > 0) {
      // Not enough characters to generate 3 wrong options, so we add more from the source
      const additionalCharsNeeded = 4 - quizCharacters.length;
      const otherChars = baybayinCharacters.filter(bc => !quizCharacters.find(qc => qc.roman === bc.roman));
      const shuffledOthers = shuffle(otherChars);
      shuffledCharacters.push(...shuffledOthers.slice(0, additionalCharsNeeded));
    }


    const newQuestions = quizCharacters.map((char) => {
      const correctAnswer = char.roman;
      // Get wrong answers from the full shuffled list to ensure enough options
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
  }, [charType, numQuestions]);

  const startQuiz = () => {
    generateQuestions();
    setQuizStarted(true);
    setQuizOver(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setAttempts(0);
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

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizOver(false);
    setQuestions([]);
  };
  
  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setSelectedAnswer(answer);
    
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (newAttempts === 1) { // Only score if correct on the first try
        setScore(score + 1);
      }
      setShowFeedback(true);
    } else {
      if (newAttempts >= MAX_ATTEMPTS) {
        setShowFeedback(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowFeedback(false);
      setAttempts(0);
    } else {
      handleFinishQuiz();
    }
  };

  const QuizSetup = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Number of Questions</Label>
        <RadioGroup value={numQuestions} onValueChange={setNumQuestions} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="10" id="q10" />
            <Label htmlFor="q10">10</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="15" id="q15" />
            <Label htmlFor="q15">15</Label>
          </div>
           <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="qAll" />
            <Label htmlFor="qAll">All ({charType === 'vowels' ? 3 : charType === 'consonants' ? 14 : baybayinCharacters.length})</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Character Types</Label>
        <RadioGroup value={charType} onValueChange={(value) => setCharType(value as CharacterType)} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="cAll" />
            <Label htmlFor="cAll">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vowels" id="cVowels" />
            <Label htmlFor="cVowels">Vowels</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="consonants" id="cConsonants" />
            <Label htmlFor="cConsonants">Consonants</Label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={startQuiz} size="lg" className="w-full">Start Quiz</Button>
    </div>
  );

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
                   {!quizStarted || quizOver ? (
                     <CardDescription className="text-muted-foreground">Customize your quiz and test your knowledge!</CardDescription>
                   ) : (
                     <CardDescription className="text-muted-foreground">
                       You have {MAX_ATTEMPTS} attempts per question. You get a point only on the first try!
                     </CardDescription>
                   )}
                </CardHeader>
                <CardContent>
                  {!quizStarted ? (
                    <QuizSetup />
                  ) : quizOver ? (
                    <div className="text-center space-y-6">
                      <h3 className="text-2xl font-semibold">Quiz Complete!</h3>
                      <p className="text-lg text-muted-foreground">
                        You scored <span className="font-bold text-primary">{score}</span> out of {questions.length}.
                      </p>
                      <Button onClick={restartQuiz} size="lg">
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
                         {attempts > 0 && !showFeedback && isCorrect === false && (
                            <p className="text-sm text-destructive">Incorrect. Try again! {MAX_ATTEMPTS - attempts} attempt(s) left.</p>
                         )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {currentQuestion.options.map((option) => (
                          <Button
                            key={option}
                            onClick={() => handleAnswerClick(option)}
                            variant={showFeedback && option === currentQuestion.correctAnswer ? 'default' : (option === selectedAnswer && isCorrect === false) ? 'destructive' : 'outline'}
                            size="lg"
                            className={`h-16 text-lg justify-center transition-all duration-300 ${
                              showFeedback && option !== currentQuestion.correctAnswer ? 'opacity-50' : ''
                            } ${
                                selectedAnswer === option && isCorrect === false && !showFeedback ? 'border-destructive' : ''
                            }`}
                            disabled={showFeedback || (selectedAnswer === option && isCorrect === false)}
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

    