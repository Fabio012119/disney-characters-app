import { useDispatch, useSelector } from "react-redux";
import {
  selectView,
  setView,
  type DashboardView,
} from "../../redux/reducers/viewsSlice";

const MenuButton = ({
  onClose,
  n,
}: {
  onClose: () => void;
  n: { label: string; view: DashboardView };
}) => {
  const dispatch = useDispatch();
  const current = useSelector(selectView);
  const isActive = (n: { view: DashboardView }) => {
    return n.view === current;
  };
  return (
    <button
      key={n.label}
      onClick={() => {
        dispatch(setView(n.view));
        onClose();
      }}
      className={`w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer ${
        isActive(n) ? "bg-slate-100 font-medium" : ""
      }`}
    >
      {n.label}
    </button>
  );
};

export default MenuButton;
