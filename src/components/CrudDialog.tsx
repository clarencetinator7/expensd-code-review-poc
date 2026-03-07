import { type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";

interface CrudDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
}

export const CrudDialog = ({
  open,
  onOpenChange,
  title,
  isEditing,
  onSubmit,
  children,
}: CrudDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onOpenChange={onOpenChange}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `Edit ${title}` : `New ${title}`}
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}
        </form>
      </DialogContent>
    </Dialog>
  );
};
