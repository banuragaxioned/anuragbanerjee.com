import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import { buttonVariants } from "@/components/ui/button";
import { feeds, pageMetadata } from "@/lib/metadata";
import { SITE, socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({
  preload: false,
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  ...pageMetadata({ fullTitle: SITE.name, path: "/" }),
  authors: [{ name: SITE.name }],
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { sizes: "48x48", url: "/favicon.ico" },
      { type: "image/svg+xml", url: "/favicon.svg" },
    ],
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(SITE.url),
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { color: "#ffffff", media: "(prefers-color-scheme: light)" },
    { color: "#0a0a0a", media: "(prefers-color-scheme: dark)" },
  ],
};

const year = new Date().getFullYear();

const navLinks = [
  { href: "/posts/", label: "Posts" },
  { href: "/weeknotes/", label: "Weeknotes" },
  { href: "/resume/", label: "Resume" },
];

const followSystemTheme = `const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const applyTheme = () => document.documentElement.classList.toggle("dark", darkQuery.matches);
applyTheme();
darkQuery.addEventListener("change", applyTheme);`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={cn(geist.variable, geistMono.variable)}
      lang={SITE.language}
      suppressHydrationWarning
    >
      <head>
        <script>{followSystemTheme}</script>
        <script
          data-cf-beacon='{"token": "829a6d0063fd49bfb0ccc3feafdbaa9d"}'
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
        />
      </head>
      <body className="antialiased">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
          <header className="mb-12 flex flex-wrap items-center justify-between gap-4">
            <Link className="font-semibold tracking-tight" href="/">
              {SITE.name}
            </Link>
            <nav className="-mr-2.5 flex">
              {navLinks.map((link) => (
                <Link
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" }),
                    "text-muted-foreground",
                  )}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t pt-6 text-sm text-muted-foreground">
            <p>
              © {year} {SITE.name}
            </p>
            <nav className="flex gap-4 *:transition-colors hover:*:text-foreground">
              {socialLinks.map((link) => (
                <a href={link.href} key={link.href} rel="me" target="_blank">
                  {link.label}
                </a>
              ))}
              <a href={feeds[0]?.url}>RSS</a>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
