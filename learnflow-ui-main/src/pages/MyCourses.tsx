import { useRole } from "@/contexts/RoleContext";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import { getCourse, getProgress } from "@/data/mockData";
import CourseCard from "@/components/CourseCard";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const { currentUserId } = useRole();
  const { enrollments } = useEnrollment();

  const myEnrollments = enrollments.filter(e => e.studentId === currentUserId);
  const coursesWithProgress = myEnrollments.map(e => {
    const course = getCourse(e.courseId);
    return course ? { course, progress: getProgress(e, course) } : null;
  }).filter(Boolean) as { course: any; progress: number }[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">My Courses</h1>
        <p className="mt-1 text-muted-foreground">{coursesWithProgress.length} courses enrolled</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coursesWithProgress.map(({ course, progress }) => (
          <CourseCard key={course.id} course={course} progress={progress} enrolled linkTo={`/learn/${course.id}`} />
        ))}
      </div>

      {coursesWithProgress.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground mb-2">No courses yet</p>
          <Link to="/catalog" className="text-primary font-medium hover:underline">Browse courses →</Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
