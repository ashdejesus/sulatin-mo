
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { Logo } from "../ui/logo";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
              Rediscover the ancient script of the Philippines.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="font-semibold text-primary mb-2">Follow Us</p>
            <div className="flex items-center space-x-4">
              <Link href="https://www.facebook.com/groups/baybayin/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center">
            <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sulatin Mo. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
