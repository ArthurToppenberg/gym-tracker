"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        let data: unknown = {};
        try {
          data = await response.json();
        } catch {
          // If parsing fails, fallback to generic error
        }
        if (
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
        ) {
          throw new Error((data as { message: string }).message);
        }
        throw new Error("Something went wrong");
      }

      router.push("/auth/signin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </div>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-400">Already have an account? </span>
        <Link
          href="/auth/signin"
          className="text-indigo-400 hover:text-indigo-300"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};
