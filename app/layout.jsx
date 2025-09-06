import ClientLayout from "./client-layout"

export const metadata = {
  title: "zenify - Ecommerce App",
  description: "Discover amazing products at great prices",
  generator: "v0.app",
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
