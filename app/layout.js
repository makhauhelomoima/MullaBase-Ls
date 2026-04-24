import './globals.css'

export const metadata = {
  title: 'Boss Journey - MullaBase',
  description: 'Launch your digital store in 7 days. Built in Maseru. Sold worldwide.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
