import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none" />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
