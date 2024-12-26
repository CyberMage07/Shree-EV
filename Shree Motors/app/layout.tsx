import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { ThemeProvider } from "./components/theme-provider"
import { ModeToggle } from "@/components/ui/mode-toggle"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shree Motors - Revolutionary Electric 3-Wheelers',
  description: 'Experience the future of sustainable mobility with Shree Motors electric 3-wheelers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <div className="fixed bottom-4 right-4">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

