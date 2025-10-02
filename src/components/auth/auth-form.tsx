"use client";

import { useState } from "react";
import { useAuth } from "@/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile, 
  AuthError,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

type AuthFormType = "login" | "signup";

export function AuthForm({ type }: { type: AuthFormType }) {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (!auth) {
        setError("Authentication service is not available.");
        setIsLoading(false);
        return;
    }

    try {
      if (type === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: unknown) {
      const authError = err as AuthError;
      setError(authError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
       <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <CardTitle>{type === "login" ? "Welcome Back" : "Create an Account"}</CardTitle>
        <CardDescription>
          {type === "login"
            ? "Sign in to access your account."
            : "Enter your details to get started."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                placeholder="Juan Dela Cruz"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : (type === "login" ? "Login" : "Sign Up")}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-center text-muted-foreground">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={type === "login" ? "/signup" : "/login"}
            className="font-semibold text-primary hover:underline"
          >
            {type === "login" ? "Sign Up" : "Login"}
          </Link>
        </p>
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            &larr; Back to Home
        </Link>
      </CardFooter>
    </Card>
  );
}
