import { DialogTrigger } from "./ui/dialog";

interface ListHeaderProps {
  title: string;
  onAddClick: () => void;
  subtitle?: React.ReactNode;
}

export const ListHeader = ({
  title,
  onAddClick,
  subtitle,
}: ListHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <div>{subtitle}</div>}
      </div>
      <DialogTrigger
        onClick={onAddClick}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        + New {title.replace(/s$/, "")}
      </DialogTrigger>
    </div>
  );
};
