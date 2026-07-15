export default function EstimatesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold">
        AI Estimate Generator
      </h1>

      <p className="mt-3 text-slate-400">
        Describe the customer's project and let Sidekick create a professional estimate.
      </p>

      <div className="mt-10">
        <textarea
          className="w-full h-48 rounded-xl bg-slate-900 border border-slate-700 p-5"
          placeholder="Example:
Replace 50 gallon water heater...
Install ceiling fan...
Pressure wash driveway..."
        />

        <button
          className="mt-6 rounded-xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-700"
        >
          Generate Estimate
        </button>
      </div>
    </main>
  );
}