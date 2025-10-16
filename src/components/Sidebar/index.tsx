type Props = {
  open: boolean;
  onClose: () => void;
};

const nav = [
  { label: "Data Table", href: "#" },
  { label: "Pie Charts", href: "#" },
];

const Sidebar = ({ open, onClose }: Props) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 shrink-0 border-r bg-white p-4 md:sticky md:top-0 md:z-0 md:block
        ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform`}
      >
        <div className="mb-6">
          <div className="text-lg font-bold">Disney Admin</div>
        </div>

        <nav className="space-y-1">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 border-t pt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Disney Dashboard
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
