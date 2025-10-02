import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
       <AuthForm type="login" />
    </div>
  );
}
