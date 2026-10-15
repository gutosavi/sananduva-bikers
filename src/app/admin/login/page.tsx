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
    <>
      <SiteNavBar />
      <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
