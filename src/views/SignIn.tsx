"use client";
import { Layout } from "@/components/layout/Layout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialAuth } from "@/components/auth/SocialAuth";
import Link from "next/link";

export default function SignIn() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-slate-500 mt-2">Welcome back to Flyout Tours</p>
          </div>
          <LoginForm />
          <SocialAuth />
          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-flyout-gold font-medium hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
