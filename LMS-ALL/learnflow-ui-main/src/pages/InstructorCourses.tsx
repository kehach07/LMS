import { useState } from "react";
import { useRole } from "@/contexts/RoleContext";
import { useCourses } from "@/contexts/CourseContext";
import { Course } from "@/types/lms";
import CourseCard from "@/components/CourseCard";
import { Plus, X, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const InstructorCourses = () => {
  const { currentUserId } = useRole();
  const { getInstructorCourses, addCourse } = useCourses();
  const courses = getInstructorCourses(currentUserId);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [price, setPrice] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Web Development");
    setPrice("");
    setShowForm(false);
  };

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Course title is required");
      return;
    }
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || "No description provided",
      instructorId: currentUserId,
      category,
      duration: "0 hours",
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
      status: "draft",
      price: parseFloat(price) || 0,
      rating: 0,
      studentsCount: 0,
      lessons: [],
    };
    addCourse(newCourse);
    toast.success("Course created! Add lessons to it.");
    resetForm();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">My Courses</h1>
          <p className="mt-1 text-muted-foreground">{courses.length} courses created</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> New Course
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div key={course.id} className="relative group">
            <CourseCard
              course={course}
              linkTo={`/instructor/courses/${course.id}/edit`}
            />
            <Link
              to={`/instructor/courses/${course.id}/students`}
              className="absolute bottom-4 right-4 rounded-lg bg-card/90 backdrop-blur-sm border border-border px-3 py-1.5 text-xs font-medium text-primary hover:bg-card transition-colors opacity-0 group-hover:opacity-100"
            >
              View Students
            </Link>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">No courses yet</p>
          <p className="text-sm">Click "New Course" to create your first course</p>
        </div>
      )}

      {/* New Course Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={resetForm}>
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-elevated animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">Create New Course</h2>
              <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Course Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Advanced JavaScript" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" rows={3} placeholder="Describe your course..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Web Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Cloud Computing</option>
                    <option>Mobile Development</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Price ($)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="49.99" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={resetForm} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
                  Cancel
                </button>
                <button onClick={handleCreate} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
