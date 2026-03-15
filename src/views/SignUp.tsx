"use client";
import { Layout } from "@/components/layout/Layout";
import { SignupForm } from "@/components/auth/SignupForm";
import { SocialAuth } from "@/components/auth/SocialAuth";
import Link from "next/link";

export default function SignUp() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-slate-500 mt-2">Join Flyout Tours today</p>
          </div>
          <SignupForm />
          <SocialAuth />
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-flyout-gold font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
