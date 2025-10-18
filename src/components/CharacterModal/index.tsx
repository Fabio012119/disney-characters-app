import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SectionList from "./SectionList";
import {
  closeModal,
  selectIsModalOpen,
  selectDetail,
  selectDetailLoading,
  selectDetailError,
} from "@/redux/reducers/charactersTableSlice";

const CharacterModal = () => {
  const open = useAppSelector(selectIsModalOpen);
  const detail = useAppSelector(selectDetail);
  const loading = useAppSelector(selectDetailLoading);
  const error = useAppSelector(selectDetailError);
  const dispatch = useAppDispatch();

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={() => dispatch(closeModal())}
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full max-w-3xl md:max-w-4xl rounded-2xl border border-blue-100 bg-white p-6 md:p-8 shadow-[0_10px_40px_rgba(2,6,23,0.4)] ring-1 ring-blue-50">
          <div className="flex items-start justify-between">
            <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#0A2A6C] via-[#153E90] to-[#3B82F6] bg-clip-text text-transparent">
              {detail?.name || (loading ? "Loading…" : "Character")}
            </h3>
            <button
              className="rounded-md border border-blue-200 px-3 py-1.5 text-sm cursor-pointer text-blue-700 hover:bg-blue-50"
              onClick={() => dispatch(closeModal())}
            >
              Close
            </button>
          </div>

          {loading && (
            <div className="mt-6 text-sm text-slate-600">Fetching details…</div>
          )}
          {error && <div className="mt-6 text-sm text-red-600">{error}</div>}

          {detail && !loading && !error && (
            <>
              {detail.imageUrl && (
                <div className="mt-6 overflow-hidden rounded-xl border border-blue-50 bg-slate-50">
                  <img
                    src={detail.imageUrl}
                    alt={detail.name}
                    className="h-80 w-full object-contain"
                  />
                </div>
              )}

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <SectionList title="TV Shows" items={detail.tvShows} />
                <SectionList title="Video Games" items={detail.videoGames} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CharacterModal;
