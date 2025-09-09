import ClientLayout from "./client-layout"

export const metadata = {
  title: "StyleWays",
  description: "Discover amazing products at great prices",
  icons: { icon: "/favicon.png", className: "h-32 w-32" }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
