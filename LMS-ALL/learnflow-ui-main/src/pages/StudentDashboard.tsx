import { useRole } from "@/contexts/RoleContext";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import { useCourses } from "@/contexts/CourseContext";
import { getProgress } from "@/data/mockData";
import { BookOpen, TrendingUp, Award, ArrowRight } from "lucide-react";
import DashboardStat from "@/components/DashboardStat";
import CourseCard from "@/components/CourseCard";
import ProgressBar from "@/components/ProgressBar";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { currentUserId } = useRole();
  const { enrollments } = useEnrollment();
  const { getCourse } = useCourses();

  const myEnrollments = enrollments.filter(e => e.studentId === currentUserId);
  const coursesWithProgress = myEnrollments.map(e => {
    const course = getCourse(e.courseId);
    return course ? { course, enrollment: e, progress: getProgress(e, course) } : null;
  }).filter(Boolean) as { course: any; enrollment: any; progress: number }[];

  const completedCount = coursesWithProgress.filter(c => c.progress === 100).length;
  const avgProgress = coursesWithProgress.length > 0
    ? Math.round(coursesWithProgress.reduce((sum, c) => sum + c.progress, 0) / coursesWithProgress.length) : 0;
  const inProgress = coursesWithProgress.filter(c => c.progress > 0 && c.progress < 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Student Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Track your learning progress</p>
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardStat label="Enrolled Courses" value={coursesWithProgress.length} icon={<BookOpen className="h-5 w-5" />} />
        <DashboardStat label="Completed" value={completedCount} icon={<Award className="h-5 w-5" />} trend={completedCount > 0 ? "Great job!" : undefined} />
        <DashboardStat label="Avg. Progress" value={`${avgProgress}%`} icon={<TrendingUp className="h-5 w-5" />} />
      </div>
      {inProgress.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Continue Learning</h2>
          <div className="space-y-3">
            {inProgress.map(({ course, progress }) => (
              <Link key={course.id} to={`/learn/${course.id}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover">
                <img src={course.coverImage} alt={course.title} className="h-16 w-24 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{course.title}</h3>
                  <div className="mt-1 max-w-xs"><ProgressBar value={progress} /></div>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}
      {coursesWithProgress.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-xl font-semibold text-foreground">All Enrolled Courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coursesWithProgress.map(({ course, progress }) => (
              <CourseCard key={course.id} course={course} progress={progress} enrolled linkTo={`/learn/${course.id}`} />
            ))}
          </div>
        </div>
      )}
      {coursesWithProgress.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground mb-2">You haven't enrolled in any courses yet</p>
          <Link to="/catalog" className="text-primary font-medium hover:underline">Browse the catalog →</Link>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
