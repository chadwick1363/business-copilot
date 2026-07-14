import Sidebar from "../components/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-5xl font-bold text-white">
          Welcome back 👋
        </h1>

        <p className="mt-3 text-slate-400">
          Every hometown hero deserves a sidekick.
        </p>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">$4,820</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Estimates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">8</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hours Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">14.2</p>
            </CardContent>
          </Card>

        </div>
      </section>
    </main>
  );
}