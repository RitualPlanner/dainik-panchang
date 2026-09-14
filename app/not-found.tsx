import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-orange-500/20">
      <div className="relative flex flex-col items-center max-w-lg w-full text-center space-y-6 bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl transition-colors">
        {/* Glow Header Icon */}
        <div className="relative flex items-center justify-center">
          <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-inner">
            <Compass className="h-12 w-12 animate-pulse" />
          </div>
        </div>

        {/* 404 Badge & Heading */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 uppercase tracking-widest">
            ERROR 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            પેજ મળ્યું નથી
          </h1>
          <h2 className="text-base sm:text-lg font-medium text-muted-foreground">
            Page Not Found
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
          તમે જે પેજ શોધી રહ્યા છો તે અસ્તિત્વમાં નથી અથવા તેને ખસેડવામાં આવ્યું
          છે. કૃપા કરીને મુખ્ય પંચાંગ ફોર્મ પેજ પર પાછા ફરો.
        </p>

        {/* Action Button */}
        <div className="pt-2 w-full flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-500 font-semibold px-6 py-2.5 shadow-lg hover:shadow-orange-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              મુખ્ય પેજ પર જાઓ / Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
