import './globals.css'

export const metadata = {
  title: 'E-Tady Social Feed',
  description: 'Plateforme sociale et communautaire',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}