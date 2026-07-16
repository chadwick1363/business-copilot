"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "../../../components/Sidebar";

type SavedEstimate = {
  id: string;
  job: string;
  estimate: string;
  status: string;
  date: string;
};

export default function NewEstimatePage() {
  const router = useRouter();

  const [jobDescription, setJobDescription] = useState("");
  const [estimate, setEstimate] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generateEstimate() {
    setError("");
    setEstimate("");

    if (!jobDescription.trim()) {
      setError("Describe the job before generating an estimate.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/estimates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setEstimate(data.estimate);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function saveEstimate() {
    if (!estimate) {
      setError("Generate an estimate before saving.");
      return;
    }

    const savedEstimate: SavedEstimate = {
      id: crypto.randomUUID(),
      job: jobDescription,
      estimate,
      status: "Draft",
      date: new Date().toLocaleDateString(),
    };

    const existingEstimates = JSON.parse(
      localStorage.getItem("sidekick-estimates") || "[]"
    );

    localStorage.setItem(
      "sidekick-estimates",
      JSON.stringify([savedEstimate, ...existingEstimates])
    );

    router.push("/estimates");
  }

  return (
    <main className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <section className="flex-1 p-10 text-white">
        <Link
          href="/estimates"
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back to estimates
        </Link>

        <h1 className="mt-6 text-4xl font-bold">New Estimate</h1>

        <p className="mt-3 text-slate-400">
          Describe the project and Sidekick will create a preliminary estimate.
        </p>

        <div className="mt-10 max-w-4xl">
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            className="h-52 w-full rounded-xl border border-slate-700 bg-slate-900 p-5 text-white outline-none focus:border-blue-500"
            placeholder="Example: Replace a 50-gallon electric water heater and remove the old unit."
          />

          <button
            onClick={generateEstimate}
            disabled={isLoading}
            className="mt-6 rounded-xl bg-blue-600 px-8 py-4 font-bold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Generating..." : "Generate Estimate"}
          </button>

          {error && (
            <p className="mt-5 rounded-xl border border-red-800 bg-red-950 p-4 text-red-200">
              {error}
            </p>
          )}

          {estimate && (
            <div className="mt-8 rounded-2xl bg-white p-8 text-black">
              <h2 className="mb-5 text-2xl font-bold">
                Preliminary Estimate
              </h2>

              <pre className="whitespace-pre-wrap font-sans leading-7">
                {estimate}
              </pre>

              <button
                onClick={saveEstimate}
                className="mt-8 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Save Estimate
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}