import { Inter } from "next/font/google";

import SessionAuthProvider from "../components/session-auth-provider";
import NavBar from "./components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export default function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex-col md:flex">
          <SessionAuthProvider>
            <NavBar />
            {children}
          </SessionAuthProvider>
        </div>
      </body>
    </html>
  );
}
