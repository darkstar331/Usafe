import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SessionWrapper from "./components/SessionWraper";
import { UserProvider } from "./context/UserContext";
import Footer from "./components/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata = {
  title: "Usafe",
  description: "Campus-Safety",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <UserProvider>
        <html lang="en">
        <head>
            <link rel="icon" href="/logo.png" />
          </head>
          <body className={roboto.className}>
            <Navbar />
            <main>{children}</main>
            <Footer/>
          </body>
        </html>
      </UserProvider>
    </SessionWrapper>

  );
}
