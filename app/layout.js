import './globals.css'

export const dynamic = 'force-dynamic' // keep this, it’s fine

export const metadata = {
  title: 'MullaBase',
  description: 'Instant Spend & Earn Marketplace',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
