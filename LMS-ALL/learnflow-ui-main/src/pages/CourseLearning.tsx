import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCourses } from "@/contexts/CourseContext";
import { useRole } from "@/contexts/RoleContext";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import LessonItem from "@/components/LessonItem";
import ProgressBar from "@/components/ProgressBar";
import { ArrowLeft, Play, FileText, CheckCircle2, Menu, X } from "lucide-react";
import { toast } from "sonner";

const CourseLearning = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { currentUserId } = useRole();
  const { getEnrollment, completeLesson, enroll } = useEnrollment();
  const { getCourse } = useCourses();

  const course = getCourse(courseId || "");
  const enrollment = getEnrollment(currentUserId, courseId || "");

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!course) {
    return <div className="flex min-h-[60vh] items-center justify-center"><p className="text-muted-foreground">Course not found</p></div>;
  }

  if (!enrollment) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">You are not enrolled in this course</p>
        <button onClick={() => { enroll(currentUserId, course.id); toast.success("Enrolled!"); }}
          className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground">Enroll Now</button>
      </div>
    );
  }

  if (course.lessons.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">This course has no lessons yet</p>
        <Link to="/my-courses" className="text-primary font-medium hover:underline">← Back to My Courses</Link>
      </div>
    );
  }

  const activeLesson = course.lessons[activeLessonIndex];
  const completedLessons = enrollment.completedLessonIds;
  const progress = Math.round((completedLessons.length / course.lessons.length) * 100);
  const isLessonComplete = completedLessons.includes(activeLesson.id);

  const handleComplete = () => {
    completeLesson(currentUserId, course.id, activeLesson.id);
    toast.success("Lesson marked as complete!");
    if (activeLessonIndex < course.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <aside className={`${sidebarOpen ? "w-80" : "w-0"} flex-shrink-0 overflow-hidden border-r border-border bg-card transition-all duration-300`}>
        <div className="flex h-full w-80 flex-col">
          <div className="border-b border-border p-4">
            <Link to="/my-courses" className="mb-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to My Courses
            </Link>
            <h2 className="font-display font-semibold text-foreground line-clamp-2">{course.title}</h2>
            <div className="mt-2"><ProgressBar value={progress} size="md" /></div>
            <p className="mt-1 text-xs text-muted-foreground">{completedLessons.length} of {course.lessons.length} lessons complete</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {course.lessons.map((lesson, i) => (
              <LessonItem key={lesson.id} title={`${i + 1}. ${lesson.title}`} type={lesson.type} duration={lesson.duration}
                completed={completedLessons.includes(lesson.id)} active={i === activeLessonIndex} onClick={() => setActiveLessonIndex(i)} />
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="text-sm text-muted-foreground">Lesson {activeLessonIndex + 1} of {course.lessons.length}</span>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-8 animate-fade-in" key={activeLesson.id}>
          {activeLesson.type === "video" ? (
            <div className="mb-6 aspect-video overflow-hidden rounded-xl bg-muted flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Video Player Placeholder</p>
                <p className="text-xs text-muted-foreground mt-1">{activeLesson.duration}</p>
              </div>
            </div>
          ) : (
            <div className="mb-6 flex items-center gap-2 text-muted-foreground">
              <FileText className="h-5 w-5" /><span className="text-sm">{activeLesson.duration}</span>
            </div>
          )}

          <h1 className="mb-4 font-display text-2xl font-bold text-foreground">{activeLesson.title}</h1>
          <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed">
            <p>{activeLesson.content}</p>
            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {isLessonComplete ? (
              <div className="flex items-center gap-2 text-success font-medium"><CheckCircle2 className="h-5 w-5" /> Lesson Complete</div>
            ) : (
              <button onClick={handleComplete} className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Mark as Completed</button>
            )}
            {activeLessonIndex < course.lessons.length - 1 && (
              <button onClick={() => setActiveLessonIndex(activeLessonIndex + 1)}
                className="rounded-lg border border-border px-6 py-2.5 font-medium text-foreground transition-colors hover:bg-muted">Next Lesson →</button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseLearning;
