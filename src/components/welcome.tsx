"use client";

import { useState, useEffect } from "react";
import AddAyam from "./addayam";
import { getUsername } from "@/lib/db";
import Image from "next/image";

export default function Welcome() {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Fetch the username on component mount
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await getUsername(); // No need to pass userId, it's fetched from session
        setUsername(fetchedUsername); // Set the fetched username
        setIsLoading(false); // Set loading to false after fetch
      } catch {
        setIsError(true); // Set error state if there's an issue
        setIsLoading(false);
      }
    };

    fetchUsername();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="card bg-base-100 w-full lg:w-1/2 shadow-xl animate-fade-up">
      <div className="card-body">
        {/* Conditionally render spinner or content based on isLoading */}
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Image src="/loading.gif" alt="Loading..." width={50} height={50} />
          </div>
        ) : (
          <>
            <h2 className="card-title">Hi, {isError ? "User" : username}!</h2>
            <p>Would you like to track your ayam consumption?</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary hover:animate-jump"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_5"
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }}
              >
                Add an ayam
              </button>
            </div>
          </>
        )}
      </div>
      <AddAyam />
    </div>
  );
}
