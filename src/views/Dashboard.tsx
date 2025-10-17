import { useState } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "../components/Headers/DashboardHeader";
import CharactersTable from "../components/Table";
import Sidebar from "../components/Sidebar";
import PieCharts from "../components/PieCharts";
import { selectView } from "../redux/reducers/viewsSlice";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const currentView = useSelector(selectView);

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

          <section className="lg:col-span-2 rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">
              {currentView === "DATA_TABLE" && "Characters"}
              {currentView === "PIE_CHARTS" && "Pie Charts"}
            </h2>
            {currentView === "DATA_TABLE" && <CharactersTable />}
            {currentView === "PIE_CHARTS" && <PieCharts />}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
