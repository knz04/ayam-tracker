"use client";

import Link from "next/link";
import { login } from "@/lib/db";
import { useFormState } from "react-dom";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const [state, formAction] = useFormState(login, {
    message: "",
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const registered = searchParams.get("registered");

  useEffect(() => {
    if (registered) {
      toast.success("Registered successfully! You can now login.");
      router.replace("/");
    }
  }, [registered]);

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Welcome to Ayam Tracker! 🍗</h1>
            <p className="py-6">
              Login now to start tracking your ayam consumption.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" action={formAction}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              {state.message && (
                <p className="text-sm text-red-500 text-center">
                  {state.message}
                </p>
              )}
              <Link
                href="/register"
                className="label-text-alt text-center link link-hover"
              >
                Don&apos;t have an account? Register now!
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
