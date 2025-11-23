import ClientLayout from "./client-layout"

export const metadata = {
  title: "StyleWays",
  description: "Discover amazing products at great prices",
  icons: { icon: "/favicon.png", className: "h-32 w-32" }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
