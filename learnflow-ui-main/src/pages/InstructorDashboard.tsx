import { useRole } from "@/contexts/RoleContext";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import { getInstructorCourses, getProgress, getCourse, users } from "@/data/mockData";
import { BookOpen, Users, TrendingUp, BarChart3 } from "lucide-react";
import DashboardStat from "@/components/DashboardStat";
import ProgressBar from "@/components/ProgressBar";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  const { currentUserId } = useRole();
  const { enrollments } = useEnrollment();
  const courses = getInstructorCourses(currentUserId);

  const totalStudents = new Set(
    enrollments.filter(e => courses.some(c => c.id === e.courseId)).map(e => e.studentId)
  ).size;

  const courseStats = courses.map(course => {
    const courseEnrollments = enrollments.filter(e => e.courseId === course.id);
    const avgProgress = courseEnrollments.length > 0
      ? Math.round(courseEnrollments.reduce((sum, e) => sum + getProgress(e, course), 0) / courseEnrollments.length)
      : 0;
    return { course, enrolledCount: courseEnrollments.length, avgProgress };
  });

  const overallAvgCompletion = courseStats.length > 0
    ? Math.round(courseStats.reduce((sum, s) => sum + s.avgProgress, 0) / courseStats.length)
    : 0;

  // Recent enrollments
  const recentEnrollments = enrollments
    .filter(e => courses.some(c => c.id === e.courseId))
    .sort((a, b) => b.enrolledAt.localeCompare(a.enrolledAt))
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Instructor Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Overview of your courses and students</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStat label="Total Courses" value={courses.length} icon={<BookOpen className="h-5 w-5" />} />
        <DashboardStat label="Total Students" value={totalStudents} icon={<Users className="h-5 w-5" />} />
        <DashboardStat label="Avg. Completion" value={`${overallAvgCompletion}%`} icon={<TrendingUp className="h-5 w-5" />} />
        <DashboardStat label="Published" value={courses.filter(c => c.status === "published").length} icon={<BarChart3 className="h-5 w-5" />} />
      </div>

      {/* Course Performance */}
      <div className="mb-8">
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Course Performance</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Course</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Students</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Avg. Progress</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {courseStats.map(({ course, enrolledCount, avgProgress }) => (
                <tr key={course.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{course.title}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      course.status === "published" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{enrolledCount}</td>
                  <td className="px-4 py-3 w-40">
                    <ProgressBar value={avgProgress} />
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/instructor/courses/${course.id}/students`} className="text-primary text-xs font-medium hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div>
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Recent Enrollments</h2>
        <div className="space-y-2">
          {recentEnrollments.map((enrollment, i) => {
            const student = users.find(u => u.id === enrollment.studentId);
            const course = getCourse(enrollment.courseId);
            if (!student || !course) return null;
            return (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 animate-fade-in">
                <img src={student.avatar} alt={student.name} className="h-8 w-8 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                  <p className="text-xs text-muted-foreground truncate">enrolled in {course.title}</p>
                </div>
                <span className="text-xs text-muted-foreground">{enrollment.enrolledAt}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
