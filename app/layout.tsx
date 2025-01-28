import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navigation from "@/components/navigation";
import { getUser } from "./actions";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Dashfolio",
  description:
    "Everything you need to manage your online presence in one place",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 const getUserStatus = await getUser()

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen w-full">
          
              {/* Nav */}
              {getUserStatus ? <Navigation /> : <HeaderAuth />}

              {/* Main */}
              <div className="flex flex-col gap-20 p-5">{children}</div>

              {/* Footer */}
              <footer className="w-full flex items-center justify-center border border-red-500 text-center text-xs gap-8 py-8 h-8 fixed bottom-0">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
          
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
