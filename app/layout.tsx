import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
// import 'easymde/dist/easymde.min.css'

const workSans = localFont({
      src: [
        {
          path: '/fonts/workSans-Black.ttf',
          weight: '900',
          style: 'normal',
        },
        {
          path: '/fonts/workSans-ExtraBold.ttf',
          weight: '800',
          style: 'normal',
        },
        {
          path: '/fonts/workSans-Bold.ttf',
          weight: '700',
          style: 'normal',
        },
        {
          path: '/fonts/workSans-SemiBold.ttf',
          weight: '600',
          style: 'normal',
        },
        {
          path: '/fonts/workSans-Medium.ttf',
          weight: '500',
          style: 'normal',
        },
        {
          path: '/fonts/workSans-Regular.ttf',
          weight: '400',
          style: 'normal',
        },
        {
          path: '/fonts/workSans-Thin.ttf',
          weight: '200',
          style: 'normal',
        },
        {
          path: '/fonts/workSans-ExtraLight.ttf',
          weight: '100',
          style: 'normal',
        },
      ],
      variable: '--font-work-sans', 
    });

export const metadata: Metadata = {
  title: "Gee Directory",
  description: "Pitch, vote and grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
