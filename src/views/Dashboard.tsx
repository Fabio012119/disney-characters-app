import { useState } from "react";
import DashboardHeader from "../components/Headers/DashboardHeader";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-3 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-lg border px-3 py-2 text-sm"
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <div className="text-base font-semibold">Disney Dashboard</div>
        </div>
        <div className="hidden md:block">
          <div className="mx-auto max-w-[1600px] px-6">
            <DashboardHeader />
          </div>
        </div>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-56px)] max-w-[1600px] grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="p-4 md:p-6">
          <div className="md:hidden mb-4">
            <DashboardHeader />
          </div>

          <div className="mb-6">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <input
                placeholder="Search characters…"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 rounded-xl border bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Characters</h2>
              <div className="h-[480px] rounded-lg border bg-slate-50/50 p-4">
                Table placeholder
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Films per Character
              </h2>
              <div className="h-[320px] rounded-lg border bg-slate-50/50 p-4">
                Chart placeholder
              </div>
              <div className="mt-4">
                <button className="rounded-lg border px-3 py-2 text-sm">
                  Export XLSX
                </button>
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Allies / Enemies</h2>
              <ul className="space-y-2 text-sm">
                <li className="rounded-lg border px-3 py-2">Ally item…</li>
                <li className="rounded-lg border px-3 py-2">Enemy item…</li>
              </ul>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Add Character (Form)
              </h2>
              <form className="space-y-3">
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="Name"
                />
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="TV Show"
                />
                <button className="rounded-lg bg-black px-4 py-2 text-white">
                  Submit
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard
