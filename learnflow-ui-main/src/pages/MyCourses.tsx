import { useEffect, useState } from "react";
import { getCoursesApi } from "@/services/courseService";
import CourseCard from "@/components/CourseCard";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCoursesApi();
      setCourses(data);
    } catch (err) {
      console.error("Failed to load courses", err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          My Courses
        </h1>
        <p className="mt-1 text-muted-foreground">
          {courses.length} courses available
        </p>
      </div>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={{
                id: course.id,
                title: course.title,
                description: course.description,
                image: course.cover_image,
              }}
              progress={0}
              enrolled={false}
              linkTo={`/learn/${course.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground mb-2">
            No courses available
          </p>
          <Link
            to="/catalog"
            className="text-primary font-medium hover:underline"
          >
            Browse courses →
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses;