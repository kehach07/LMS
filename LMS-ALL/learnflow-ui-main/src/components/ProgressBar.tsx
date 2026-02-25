interface ProgressBarProps {
  value: number;
  size?: "sm" | "md";
  showLabel?: boolean;
}

const ProgressBar = ({ value, size = "sm", showLabel = true }: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const isComplete = clampedValue === 100;

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 overflow-hidden rounded-full bg-muted ${size === "sm" ? "h-1.5" : "h-2.5"}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            isComplete ? "bg-success" : "bg-primary"
          }`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className={`text-xs font-medium ${isComplete ? "text-success" : "text-muted-foreground"}`}>
          {clampedValue}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
