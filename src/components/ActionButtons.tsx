import { Trash2, Edit2 } from "lucide-react";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  variant?: "default" | "compact";
}

export const ActionButtons = ({
  onEdit,
  onDelete,
  variant = "default",
}: ActionButtonsProps) => {
  const buttonClass =
    variant === "compact"
      ? "p-1 hover:bg-accent rounded transition-colors"
      : "p-2 hover:bg-accent rounded transition-colors";

  const iconSize = variant === "compact" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className="flex justify-end gap-2">
      <button onClick={onEdit} className={buttonClass}>
        <Edit2 className={iconSize} />
      </button>
      <button
        onClick={onDelete}
        className="p-2 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
      >
        <Trash2 className={variant === "compact" ? "w-3 h-3" : "w-4 h-4"} />
      </button>
    </div>
  );
};
