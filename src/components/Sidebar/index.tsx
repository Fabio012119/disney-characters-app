import { nav } from "@/constants/menu-nav";
import MenuButton from "./MenuButton";
import type { SideBarProps } from "@/types/component-props";

const Sidebar = ({ open, onClose }: SideBarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-50 shadow-2xl inset-y-0 left-0 w-64 shrink-0 border-r border-blue-500 bg-white p-4 md:sticky md:top-0 md:z-0 md:block
        ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform`}
      >
        <div className="mb-6">
          <div className="text-lg font-bold">Disney Admin</div>
        </div>

        <nav className="space-y-1">
          {nav.map((n) => {
            return <MenuButton onClose={() => onClose()} n={n} />;
          })}
        </nav>

        <div className="mt-6 border-t-4 border-blue-500 pt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Disney Dashboard
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
