import { Linkedin } from 'lucide-react';

/**
 * Application footer.
 * Shows attribution and developer info.
 */
export function Footer() {
  return (
    <footer className="border-t mt-auto bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-sm">
          <p className="font-medium text-muted-foreground">Built by</p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Anton Goncharenko</span>
            <a
              href="https://www.linkedin.com/in/anton-goncharenko-023a7288"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">Lead Software Engineer</p>
        </div>
      </div>
    </footer>
  );
}

