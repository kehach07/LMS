import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInstructorCourses } from "@/services/courseService";
import { Button } from "@/components/ui/button";

type Course = {
  id: number;
  title: string;
  description: string;
  cover_image?: string;
};

const InstructorCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getInstructorCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">
            {courses.length} courses created
          </p>
        </div>

        <Button onClick={() => navigate("/instructor/courses/create")}>
          + New Course
        </Button>
      </div>

      {/* Course List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-xl overflow-hidden shadow-sm bg-card hover:shadow-md transition"
          >
            {/* Image */}
            {course.cover_image && (
              <img
                src={course.cover_image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center mt-10 text-muted-foreground">
          No courses yet. Create your first course.
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;