"use client";
import { Layout } from "@/components/layout/Layout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialAuth } from "@/components/auth/SocialAuth";

export default function Auth() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-slate-500 mt-2">Sign in to your Flyout Tours account</p>
          </div>
          <LoginForm />
          <SocialAuth />
        </div>
      </div>
    </Layout>
  );
}
