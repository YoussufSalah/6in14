"use client";

import React, { useState } from "react";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/universal/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signUp(email, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Could not sign up");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
        <div className="max-w-md w-full space-y-8 p-10 bg-bg-secondary rounded-2xl border border-border-subtle text-center">
          <div className="mx-auto h-16 w-16 bg-success/20 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-success" />
          </div>
          <h2 className="text-3xl font-display font-black text-white italic tracking-tighter">
            Check Your Email
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            We've sent a confirmation link to <span className="text-white font-bold">{email}</span>. 
            Please verify your account to get started.
          </p>
          <div className="mt-8">
            <Link href="/login" className="text-app-accent font-bold hover:underline font-mono text-sm tracking-widest uppercase">
              Go to Login →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 py-12">
      <div className="max-w-md w-full space-y-8 p-10 bg-bg-secondary rounded-2xl border border-border-subtle shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-app-accent/20 rounded-xl flex items-center justify-center mb-4">
             <UserPlus className="h-6 w-6 text-app-accent" />
          </div>
          <h2 className="text-3xl font-display font-black text-white italic tracking-tighter">
            Get Started
          </h2>
          <p className="mt-2 text-sm text-text-tertiary">
            Create an account to save your progress.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-tertiary mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-bg-tertiary border border-border-subtle rounded-lg text-white font-mono text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-app-accent/20 focus:border-app-accent transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-tertiary mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-bg-tertiary border border-border-subtle rounded-lg text-white font-mono text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-app-accent/20 focus:border-app-accent transition-all"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-error text-xs font-mono bg-error/10 p-3 rounded-lg border border-error/20">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 font-bold text-sm tracking-widest uppercase"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-xs text-text-tertiary">
            Already have an account?{" "}
            <Link href="/login" className="text-app-accent font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
