import { useParams, Link } from "react-router-dom";
import { useCourses } from "@/contexts/CourseContext";
import { users, getProgress } from "@/data/mockData";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import ProgressBar from "@/components/ProgressBar";
import { ArrowLeft } from "lucide-react";

const CourseStudents = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { enrollments } = useEnrollment();
  const { getCourse } = useCourses();
  const course = getCourse(courseId || "");

  if (!course) {
    return <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">Course not found</div>;
  }

  const courseEnrollments = enrollments.filter(e => e.courseId === course.id);
  const studentData = courseEnrollments.map(enrollment => {
    const student = users.find(u => u.id === enrollment.studentId);
    const progress = getProgress(enrollment, course);
    return student ? { student, enrollment, progress } : null;
  }).filter(Boolean) as any[];

  const avgCompletion = studentData.length > 0
    ? Math.round(studentData.reduce((sum: number, s: any) => sum + s.progress, 0) / studentData.length) : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link to="/instructor/courses" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">{course.title}</h1>
        <p className="mt-1 text-muted-foreground">{studentData.length} students enrolled · {avgCompletion}% average completion</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Completed</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Progress</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map(({ student, enrollment, progress }: any) => (
              <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={student.avatar} alt={student.name} className="h-8 w-8 rounded-full object-cover" />
                    <span className="font-medium text-foreground">{student.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{student.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{enrollment.completedLessonIds.length} / {course.lessons.length}</td>
                <td className="px-4 py-3 w-40"><ProgressBar value={progress} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {studentData.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">No students enrolled yet</div>
        )}
      </div>
    </div>
  );
};

export default CourseStudents;
