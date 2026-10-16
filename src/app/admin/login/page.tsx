import { LoginForm } from "@/components/auth/login-form";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página de Login - Admin",
  description: "Página de login para acesso ao painel administrativo.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <SiteNavBar />
      <main className="flex-1 flex items-center justify-center bg-accent-foreground/5">
        <LoginForm className="w-full max-w-sm" />
      </main>
      <SiteFooter />
    </div>
  );
}
