import type { SectionListProps } from "@/types/component-props";

const SectionList = ({ title, items, className = "" }: SectionListProps) => {
  return (
    <div className={className} data-testid={`character-${title}`}>
      <div className="mb-2 text-sm font-medium text-[#0A2A6C]">{title}</div>
      {items?.length ? (
        <ul className="list-disc pl-5 text-sm leading-6 text-slate-800">
          {items.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-slate-500">—</div>
      )}
    </div>
  );
};

export default SectionList;
