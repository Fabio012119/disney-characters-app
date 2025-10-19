import { useState } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "@/components/Headers/DashboardHeader";
import CharactersTable from "@/components/Table";
import Sidebar from "@/components/Sidebar";
import PieCharts from "@/components/PieCharts";
import { selectView } from "@/redux/reducers/viewsSlice";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const currentView = useSelector(selectView);

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="sticky top-0 z-30 border-b-2 border-blue-500 bg-white/80 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-3 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-lg border px-3 py-2 text-sm"
            aria-label="Open sidebar"
          >
            ☰
          </button>
        </div>
        <div className="hidden md:block">
          <div className="mx-auto">
            <DashboardHeader device="desktop" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-56px)] grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="p-4 md:p-6 bg-gray-200">
          <div className="md:hidden mb-4">
            <DashboardHeader device="mobile" />
          </div>

          <section className="w-[80%] max-md:w-full min-h-[50%] mx-auto flex flex-col justify-center rounded-xl shadow-2xl bg-white">
            <h2 className="m-5 text-lg font-semibold">
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
