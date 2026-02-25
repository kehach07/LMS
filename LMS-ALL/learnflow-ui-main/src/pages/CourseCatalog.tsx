import { useState } from "react";
import { useCourses } from "@/contexts/CourseContext";
import { getInstructor } from "@/data/mockData";
import { useRole } from "@/contexts/RoleContext";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import CourseCard from "@/components/CourseCard";
import { Search } from "lucide-react";
import { toast } from "sonner";

const categories = ["All", "Data Science", "Web Development", "Design", "Cloud Computing", "Marketing", "Mobile Development"];

const CourseCatalog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { currentUserId } = useRole();
  const { enroll, isEnrolled } = useEnrollment();
  const { getPublishedCourses } = useCourses();
  const courses = getPublishedCourses();

  const filtered = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Course Catalog</h1>
        <p className="mt-1 text-muted-foreground">Discover courses to advance your skills</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(course => {
          const enrolled = isEnrolled(currentUserId, course.id);
          return (
            <CourseCard key={course.id} course={course} enrolled={enrolled}
              linkTo={enrolled ? `/learn/${course.id}` : undefined}
              onEnroll={!enrolled ? () => { enroll(currentUserId, course.id); toast.success(`Enrolled in "${course.title}"!`); } : undefined} />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">No courses found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;
