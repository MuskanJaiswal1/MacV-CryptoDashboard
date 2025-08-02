import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'Crypto Dashboard',
  description: 'Track and manage your favorite cryptocurrencies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans min-h-screen">
        <Navbar />
        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  )
}