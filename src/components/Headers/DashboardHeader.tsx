import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/reducers/authSlice";

const DashboardHeader = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((s) => s.auth.username);

  return (
    <header className="flex items-center justify-between p-3">
      <h1 className="text-2xl text-blue-500 font-bold">Disney Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-600">Hello, {username}</span>
        <button
          onClick={() => dispatch(logout())}
          className="px-3 py-2 border rounded-lg border-black font-semibold hover:text-white hover:bg-black cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
