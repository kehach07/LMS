import { Video, FileText, CheckCircle2, Circle } from "lucide-react";

interface LessonItemProps {
  title: string;
  type: "video" | "text";
  duration: string;
  completed?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const LessonItem = ({ title, type, duration, completed, active, onClick }: LessonItemProps) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
      active
        ? "bg-accent text-accent-foreground"
        : "text-foreground hover:bg-muted"
    }`}
  >
    <span className="flex-shrink-0">
      {completed ? (
        <CheckCircle2 className="h-4.5 w-4.5 text-success" />
      ) : (
        <Circle className="h-4.5 w-4.5 text-muted-foreground" />
      )}
    </span>
    <span className="flex-shrink-0 text-muted-foreground">
      {type === "video" ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
    </span>
    <span className="flex-1 truncate">{title}</span>
    <span className="flex-shrink-0 text-xs text-muted-foreground">{duration}</span>
  </button>
);

export default LessonItem;
