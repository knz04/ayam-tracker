"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Profile() {
  const [username, setUsername] = useState<string>("");
  const [dateJoined, setDateJoined] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile`);

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUsername(data.user.username);
        const fullDate = data.user.created_at.toString();
        setDateJoined(fullDate.split("T")[0]);
        setUserId(data.user.id);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="flex flex-col items-center flex-grow">
      <div className="card bg-base-100 w-full xl:w-1/2 shadow-xl animate-fade-up">
        <div className="card-body">
          <h2 className="card-title">Your Ayam Tracker Profile</h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-5">
              <Image
                src="/loading.gif"
                alt="Loading..."
                width={50}
                height={50}
              />
            </div>
          ) : (
            <div className="flex">
              <div className="flex-none w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-400 mt-4">
                <span className="flex justify-center py-3 md:py-4 text-4xl md:text-5xl">
                  🐔
                </span>
              </div>
              <div className="flex-grow ml-4 mt-4">
                <p className="font-bold">{username}</p>
                <p>Tracking Ayam since {dateJoined}</p>
                <p className="text-xs text-base-300">User ID: {userId}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
