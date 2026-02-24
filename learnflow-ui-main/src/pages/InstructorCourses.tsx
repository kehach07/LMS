import { useState } from "react";
import { useRole } from "@/contexts/RoleContext";
import { getInstructorCourses } from "@/data/mockData";
import CourseCard from "@/components/CourseCard";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

const InstructorCourses = () => {
  const { currentUserId } = useRole();
  const courses = getInstructorCourses(currentUserId);
  const [showForm, setShowForm] = useState(false);

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
          <CourseCard
            key={course.id}
            course={course}
            linkTo={`/instructor/courses/${course.id}/students`}
          />
        ))}
      </div>

      {/* New Course Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-elevated animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">Create New Course</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Course Title</label>
                <input className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Advanced JavaScript" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
                <textarea className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" rows={3} placeholder="Describe your course..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Category</label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
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
                  <input type="number" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="49.99" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
                  Cancel
                </button>
                <button onClick={() => { setShowForm(false); toast.success("Course created (UI demo)"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
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
