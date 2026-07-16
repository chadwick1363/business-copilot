"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

type SavedEstimate = {
  id: string;
  job: string;
  estimate: string;
  status: string;
  date: string;
};

export default function EstimatesPage() {
  const [search, setSearch] = useState("");
  const [estimates, setEstimates] = useState<SavedEstimate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("sidekick-estimates") || "[]"
    );

    setEstimates(saved);
  }, []);

  const filteredEstimates = estimates.filter((estimate) =>
    `${estimate.job} ${estimate.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
          >
            + New Estimate
          </Link>
        </div>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search estimates..."
          className="mt-8 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
        />

        <div className="mt-8 space-y-4">
          {filteredEstimates.map((estimate) => (
            <div
              key={estimate.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {estimate.job}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Created {estimate.date}
                  </p>
                </div>

                <span className="rounded-full bg-slate-700 px-3 py-1 text-sm">
                  {estimate.status}
                </span>
              </div>

              <pre className="mt-5 line-clamp-4 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-400">
                {estimate.estimate}
              </pre>
            </div>
          ))}

          {filteredEstimates.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
              <p className="text-slate-400">No saved estimates yet.</p>

              <Link
                href="/estimates/new"
                className="mt-5 inline-block font-semibold text-blue-400 hover:text-blue-300"
              >
                Create your first estimate →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}