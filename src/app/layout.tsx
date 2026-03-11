import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Flyout Tours — Dubai Travel Experiences',
  description: 'Book tours, adventures, desert safaris and experiences in Dubai and UAE',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,131,206,0.12),transparent_60%)] pointer-events-none z-0" />
          <Providers>
            <div className="relative z-10">
              {children}
            </div>
          </Providers>
        </div>
      </body>
    </html>
  )
}
