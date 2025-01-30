"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Stats({ refreshKey }: { refreshKey: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [thisWeek, setThisWeek] = useState<number>(0);
  const [thisMonth, setThisMonth] = useState<number>(0);
  const [thisYear, setThisYear] = useState<number>(0);
  const [compareMonth, setCompareMonth] = useState<number>(0);
  const [compareYear, setCompareYear] = useState<number>(0);
  const [monthUp, setMonthUp] = useState<boolean>(false);
  const [yearUp, setYearUp] = useState<boolean>(false);
  const [monthPercent, setMonthPercent] = useState<number>(0);
  const [yearPercent, setYearPercent] = useState<number>(0);

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const date = today.getDate();
  const month = today
    .toLocaleString("default", { month: "long" })
    .substring(0, 3);
  const todayDate = `${date} ${month}`;

  const lastWeekDate = lastWeek.getDate();
  const lastWeekMonth = lastWeek
    .toLocaleString("default", { month: "long" })
    .substring(0, 3);
  const lastWeekDateStr = `${lastWeekDate} ${lastWeekMonth}`;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/stats`);

        if (!response.ok) {
          throw new Error("Failed to fetch ayam history");
        }

        const data = await response.json();
        setThisWeek(Number(data.weekCount));
        setThisMonth(Number(data.monthCount));
        setThisYear(Number(data.yearCount));
        setCompareMonth(Number(data.compareMonthCount));
        setCompareYear(Number(data.compareYearCount));
        setMonthUp(data.monthUp);
        setYearUp(data.yearUp);

        // Avoid dividing by zero
        if (thisMonth > 0) {
          setMonthPercent(Math.round((compareMonth / thisMonth) * 100));
        }

        if (thisYear > 0) {
          setYearPercent(Math.round((compareYear / thisYear) * 100));
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [thisMonth, thisYear, refreshKey]); // Removed today, lastWeek from dependencies

  return (
    <div className="flex flex-col w-full h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Image src="/loading.gif" alt="Loading..." width={50} height={50} />
        </div>
      ) : (
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">This week&apos;s ayam</div>
            <div className="stat-value">{thisWeek}</div>
            <div className="stat-desc">
              {lastWeekDateStr} - {todayDate}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">This month&apos;s ayam</div>
            <div className="stat-value">{thisMonth}</div>
            <div className="stat-desc">
              {monthUp ? "↗︎" : "↘︎"} {compareMonth} ({monthPercent}%)
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">This year&apos;s ayam</div>
            <div className="stat-value">{thisYear}</div>
            <div className="stat-desc">
              {yearUp ? "↗︎" : "↘︎"} {compareYear} ({yearPercent}%)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
