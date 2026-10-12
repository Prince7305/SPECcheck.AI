
import React from 'react';
import { GithubIcon } from './Icons';

export default function LoginPage({ error }) {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-[420px] flex-col">
      <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-8">
        <div className="flex justify-center">
          <img
            src="/speccheck-logo.png"
            alt="SPECcheck.AI — Engineering Intelligence Platform"
            className="h-auto w-full max-w-[290px] object-contain"
          />
        </div>

        <div className="mt-6">
          <h1 className="text-xl font-semibold tracking-tight text-[#0B1F3A]">
            Welcome to SPECcheck.AI
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Understand your codebase, identify change impact, and preserve
            important engineering decisions.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
          >
            {error}
          </div>
        )}

        <a
          href="/api/auth/github"
          className="mt-6 flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#14304F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8A89] focus-visible:ring-offset-2"
        >
          <GithubIcon className="h-5 w-5" />
          Continue with GitHub
        </a>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-xs leading-5 text-slate-500">
            Connect your GitHub account to get started. Repository access
            depends on the permissions configured for your application.
          </p>
        </div>
      </section>

      <p className="mt-4 text-center text-xs leading-5 text-slate-300">
        Engineering Intelligence Platform
      </p>
    </main>
  );
}
