export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">
          Business Copilot
        </h1>

        <p className="mt-6 text-xl text-gray-400">
          Your AI employee for small businesses.
        </p>

        <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </main>
  );
}