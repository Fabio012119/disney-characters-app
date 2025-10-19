import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectView,
  setView,
  type DashboardView,
} from "@/redux/reducers/viewsSlice";
import type { MenuButtonProps } from "@/types/component-props";

const MenuButton = ({ onClose, n }: MenuButtonProps) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectView);
  const isActive = (n: { view: DashboardView }) => {
    return n.view === current;
  };
  return (
    <button
      key={n.label}
      data-testid={`menu-opt-${n.view}`}
      onClick={() => {
        dispatch(setView(n.view));
        onClose();
      }}
      className={`w-full text-left  rounded-lg px-3 py-2 text-sm cursor-pointer ${
        isActive(n)
          ? "bg-blue-500/80 font-bold text-white"
          : "hover:bg-blue-500/20 font-medium"
      }`}
    >
      {n.label}
    </button>
  );
};

export default MenuButton;
