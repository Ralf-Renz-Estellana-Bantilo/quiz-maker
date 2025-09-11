import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';

import { Providers } from './providers';

import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] });
export const metadata: Metadata = {
   title: {
      default: 'Quiz Maker | Bookipi',
      template: 'Next.js + HeroUI',
   },
   description: 'This is a simple quiz maker application.',
   icons: {
      icon: '/favicon.ico',
   },
};

export const viewport: Viewport = {
   themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
   ],
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html suppressHydrationWarning lang='en'>
         <body
            className={`min-h-screen text-foreground bg-background gradient-background ${quicksand.className}`}>
            <Providers
               themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
               {children}
            </Providers>
         </body>
      </html>
   );
}
