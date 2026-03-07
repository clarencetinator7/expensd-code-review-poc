interface EmptyStateProps {
  message: string;
  isBordered?: boolean;
}

export const EmptyState = ({
  message,
  isBordered = false,
}: EmptyStateProps) => {
  return (
    <div
      className={`text-center py-12 ${
        isBordered ? "border border-border rounded-lg bg-card" : ""
      }`}
    >
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
