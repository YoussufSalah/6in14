"use client";

import React, { useState } from "react";
import { signIn, signInWithMagicLink } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";
import { Button } from "@/components/universal/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await signIn(email, password);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await signInWithMagicLink(email);
      setMessage("Magic link sent! Check your email.");
    } catch (err: any) {
      setError(err.message || "Could not send magic link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 py-12">
      <div className="max-w-md w-full space-y-8 p-10 bg-bg-secondary rounded-2xl border border-border-subtle shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-app-accent/20 rounded-xl flex items-center justify-center mb-4">
             <LogIn className="h-6 w-6 text-app-accent" />
          </div>
          <h2 className="text-3xl font-display font-black text-white italic tracking-tighter">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-text-tertiary">
            Sign in to access your dashboard.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-bg-tertiary border border-border-subtle rounded-lg text-white font-mono text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-app-accent/20 focus:border-app-accent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-error text-xs font-mono bg-error/10 p-3 rounded-lg border border-error/20">
              {error}
            </div>
          )}

          {message && (
            <div className="text-success text-xs font-mono bg-success/10 p-3 rounded-lg border border-success/20">
              {message}
            </div>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 font-bold text-sm tracking-widest uppercase"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            
            <button
              type="button"
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full h-12 bg-transparent border border-border-strong text-white font-mono text-xs tracking-widest uppercase hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-app-accent" />
              Send Magic Link
            </button>
          </div>
        </form>

        <div className="text-center pt-4">
          <p className="text-xs text-text-tertiary">
            Don't have an account?{" "}
            <Link href="/signup" className="text-app-accent font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
