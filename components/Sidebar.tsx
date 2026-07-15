import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        Sidekick
      </h1>

      <nav className="space-y-4">

        <button className="block w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800 transition">
          🏠 Dashboard
        </button>

        <button className="block w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800 transition">
          📧 AI Inbox
        </button>

        <button className="block w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800 transition">
          👥 Customers
        </button>

       <Link
  href="/estimates"
  className="block w-full rounded-lg px-4 py-3 hover:bg-slate-800"
>
  📄 Quotes
</Link>

        <button className="block w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800 transition">
          💰 Invoices
        </button>

        <button className="block w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800 transition">
          ⚙️ Settings
        </button>

      </nav>
    </aside>
  );
}