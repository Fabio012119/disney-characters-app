import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/reducers/authSlice";
import DisneyImage from "../DisneyImage";

const DashboardHeader = ({ device }: { device: "desktop" | "mobile" }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((s) => s.auth.username);

  return (
    <header className="flex items-center justify-between p-3 text-white bg-blue-500">
      <DisneyImage className="w-[7rem] ml-8 invert" device={device} />
      <div className="flex items-center gap-3">
        <span
          className="text-sm text-white"
          data-testid={`username-text-${device}`}
        >
          Hello, {username}
        </span>
        <button
          onClick={() => dispatch(logout())}
          data-testid={`log-out-btn-${device}`}
          className="px-3 py-2 border rounded-lg border-white 
          font-semibold hover:text-blue-500 hover:bg-white cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
