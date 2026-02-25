import { Link } from "react-router-dom";
import { Course } from "@/types/lms";
import { getInstructor } from "@/data/mockData";
import { Clock, BookOpen, Star, Users } from "lucide-react";
import ProgressBar from "./ProgressBar";

interface CourseCardProps {
  course: Course;
  progress?: number;
  enrolled?: boolean;
  onEnroll?: () => void;
  linkTo?: string;
}

const CourseCard = ({ course, progress, enrolled, onEnroll, linkTo }: CourseCardProps) => {
  const instructor = getInstructor(course.instructorId);
  const isComplete = progress === 100;

  const card = (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {course.status === "draft" && (
          <span className="absolute left-3 top-3 rounded-full bg-warning px-2.5 py-0.5 text-xs font-semibold text-warning-foreground">
            Draft
          </span>
        )}
        {isComplete && (
          <span className="absolute left-3 top-3 rounded-full bg-success px-2.5 py-0.5 text-xs font-semibold text-success-foreground">
            Completed ✓
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
            {course.category}
          </span>
          <div className="flex items-center gap-0.5 text-warning">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-medium text-foreground">{course.rating}</span>
          </div>
        </div>

        <h3 className="mb-1 line-clamp-2 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {instructor && (
          <p className="mb-3 text-sm text-muted-foreground">{instructor.name}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> {course.lessons.length} lessons
          </span>
          {course.studentsCount > 0 && (
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {course.studentsCount.toLocaleString()}
            </span>
          )}
        </div>

        {typeof progress === "number" && (
          <div className="mt-3">
            <ProgressBar value={progress} />
          </div>
        )}

        {!enrolled && onEnroll && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEnroll(); }}
            className="mt-3 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Enroll — ${course.price}
          </button>
        )}

        {enrolled && !linkTo && (
          <div className="mt-3 text-center text-sm font-medium text-primary">Enrolled</div>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="block">{card}</Link>;
  }

  return card;
};

export default CourseCard;
