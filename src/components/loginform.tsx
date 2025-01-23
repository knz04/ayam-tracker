"use client";
import { useState } from "react";
import Link from "next/link";
import { login } from "@/lib/db"; // Adjust the import path

type ErrorsType = {
  [key: string]: string | string[];
};

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorsType>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    // Call the login function and handle the result
    const result = await login(formData);

    // If there are errors, set the errors state
    if (result.errors) {
      setErrors({
        username: result.errors.username || "",
        password: result.errors.password || "",
      });
    }
  };

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
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errors.username && (
                  <span className="text-red-500">{errors.username}</span>
                )}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && (
                  <span className="label-text-alt mt-1 ml-1 text-red-500">
                    {errors.password}
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
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
