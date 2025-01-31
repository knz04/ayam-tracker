"use client";

import Link from "next/link";
import { register } from "@/lib/db";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, formAction] = useActionState(register, {
    errors: {},
    message: "",
  });

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form action={formAction} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="input input-bordered"
            required
          />
          {state.errors?.username && (
            <p className="text-sm text-red-500 mt-1">
              {state.errors.username[0]}
            </p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          {state.errors?.password && (
            <p className="text-sm text-red-500 mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
        <Link href="/" className="label-text-alt text-center link link-hover">
          Already have an account? Login now!
        </Link>
      </form>
    </div>
  );
}
