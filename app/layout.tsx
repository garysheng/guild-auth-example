import { ContextProvider } from './providers'
import Header from './components/Header'
import "./globals.css";
import { headers } from 'next/headers';

export const metadata = {
  title: 'Guild Auth Example',
  description: 'Example of Guild.xyz authentication',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookies = (await headers()).get('cookie') // Await the headers promise
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <ContextProvider cookies={cookies}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  )
}
