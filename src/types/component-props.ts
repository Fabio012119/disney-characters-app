import type { ChangeEventHandler } from "react";
import type { DashboardView } from "@/redux/reducers/viewsSlice";

export type SectionListProps = {
  title: string;
  items?: string[];
  className?: string;
};

export type FormInputsProps = {
    type : "password" | "username",
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

export type PageNumberSelectorProps = {
  value: number;
  totalPages: number;
  count: number;
  nameQ?: string;
  disabled?: boolean;
  onChange: (page: number) => void;
}

export type SideBarProps =  { open: boolean; onClose: () => void }

export type MenuButtonProps = {
  onClose: () => void;
  n: { label: string; view: DashboardView };
}

export type LabeledInputWithClearProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  onClear: () => void;
  className?: string;
}