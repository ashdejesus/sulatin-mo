import { AuthForm } from "@/components/auth/auth-form";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <AuthForm type="signup" />
    </div>
  );
}
