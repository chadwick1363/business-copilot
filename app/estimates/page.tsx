"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const estimates = [
  {
    customer: "John Smith",
    job: "Water Heater Replacement",
    status: "Pending",
    total: "$1,895",
    date: "Jul 16, 2026",
  },
  {
    customer: "Sarah Jones",
    job: "Kitchen Remodel",
    status: "Sent",
    total: "$12,400",
    date: "Jul 15, 2026",
  },
  {
    customer: "Mike Davis",
    job: "Electrical Panel Upgrade",
    status: "Draft",
    total: "$3,650",
    date: "Jul 14, 2026",
  },
];

export default function EstimatesPage() {
  const [search, setSearch] = useState("");

  const filteredEstimates = estimates.filter((estimate) => {
    const text = `${estimate.customer} ${estimate.job} ${estimate.status}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <main className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <section className="flex-1 p-10 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Estimates</h1>
            <p className="mt-2 text-slate-400">
              Create, review, and manage customer estimates.
            </p>
          </div>

          <Link
            href="/estimates/new"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
          >
            + New Estimate
          </Link>
        </div>

        <div className="mt-8">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search estimates..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-8 space-y-4">
          {filteredEstimates.map((estimate) => (
            <div
              key={`${estimate.customer}-${estimate.job}`}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
            >
              <div>
                <h2 className="text-xl font-semibold">{estimate.customer}</h2>
                <p className="mt-1 text-slate-400">{estimate.job}</p>
                <p className="mt-2 text-sm text-slate-500">{estimate.date}</p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">{estimate.total}</p>

                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    estimate.status === "Sent"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : estimate.status === "Pending"
                      ? "bg-amber-500/15 text-amber-300"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {estimate.status}
                </span>
              </div>
            </div>
          ))}

          {filteredEstimates.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
              No estimates found.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}