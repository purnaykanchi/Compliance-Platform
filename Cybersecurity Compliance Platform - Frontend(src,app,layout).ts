import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'CyberGuard | Compliance Platform',
  description: 'Comprehensive cybersecurity compliance management platform',
  keywords: [
    'cybersecurity',
    'compliance',
    'gdpr',
    'hipaa',
    'soc2',
    'iso27001',
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}