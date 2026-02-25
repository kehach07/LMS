import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCourses } from "@/contexts/CourseContext";
import { Lesson } from "@/types/lms";
import { ArrowLeft, Plus, Video, FileText, Trash2, GripVertical, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";

const CourseEditor = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getCourse, updateCourse, addLesson, updateLesson, deleteLesson } = useCourses();
  const course = getCourse(courseId || "");

  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState<"video" | "text">("video");
  const [lessonDuration, setLessonDuration] = useState("");
  const [lessonContent, setLessonContent] = useState("");

  // Course edit state
  const [editingCourse, setEditingCourse] = useState(false);
  const [courseTitle, setCourseTitle] = useState(course?.title || "");
  const [courseDesc, setCourseDesc] = useState(course?.description || "");

  if (!course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Course not found
      </div>
    );
  }

  const resetLessonForm = () => {
    setLessonTitle("");
    setLessonType("video");
    setLessonDuration("");
    setLessonContent("");
    setShowLessonForm(false);
    setEditingLesson(null);
  };

  const handleAddLesson = () => {
    if (!lessonTitle.trim()) {
      toast.error("Lesson title is required");
      return;
    }
    const newLesson: Lesson = {
      id: `${course.id}-lesson-${Date.now()}`,
      title: lessonTitle.trim(),
      type: lessonType,
      duration: lessonDuration || (lessonType === "video" ? "10:00" : "5 min read"),
      content: lessonContent || `Content for "${lessonTitle.trim()}"`,
    };
    addLesson(course.id, newLesson);
    toast.success("Lesson added!");
    resetLessonForm();
  };

  const handleUpdateLesson = () => {
    if (!editingLesson || !lessonTitle.trim()) return;
    updateLesson(course.id, editingLesson, {
      title: lessonTitle.trim(),
      type: lessonType,
      duration: lessonDuration || (lessonType === "video" ? "10:00" : "5 min read"),
      content: lessonContent,
    });
    toast.success("Lesson updated!");
    resetLessonForm();
  };

  const startEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson.id);
    setLessonTitle(lesson.title);
    setLessonType(lesson.type);
    setLessonDuration(lesson.duration);
    setLessonContent(lesson.content);
    setShowLessonForm(true);
  };

  const handleDeleteLesson = (lessonId: string) => {
    deleteLesson(course.id, lessonId);
    toast.success("Lesson deleted");
  };

  const handleSaveCourseDetails = () => {
    updateCourse(course.id, { title: courseTitle, description: courseDesc });
    setEditingCourse(false);
    toast.success("Course details updated!");
  };

  const toggleStatus = () => {
    const newStatus = course.status === "published" ? "draft" : "published";
    updateCourse(course.id, { status: newStatus });
    toast.success(`Course ${newStatus === "published" ? "published" : "set to draft"}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link to="/instructor/courses" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>

      {/* Course Details */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-start justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Course Details</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleStatus}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                course.status === "published"
                  ? "bg-success/10 text-success hover:bg-success/20"
                  : "bg-warning/10 text-warning hover:bg-warning/20"
              }`}
            >
              {course.status === "published" ? "Published" : "Draft"}
            </button>
            {!editingCourse && (
              <button onClick={() => { setEditingCourse(true); setCourseTitle(course.title); setCourseDesc(course.description); }}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                <Edit2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {editingCourse ? (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Title</label>
              <input value={courseTitle} onChange={e => setCourseTitle(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
              <textarea value={courseDesc} onChange={e => setCourseDesc(e.target.value)} rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSaveCourseDetails}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Save className="h-4 w-4" /> Save
              </button>
              <button onClick={() => setEditingCourse(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{course.description}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{course.category}</span>
              <span>${course.price}</span>
              <span>{course.lessons.length} lessons</span>
            </div>
          </div>
        )}
      </div>

      {/* Lessons */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Lessons ({course.lessons.length})
          </h2>
          <button
            onClick={() => { resetLessonForm(); setShowLessonForm(true); }}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Add Lesson
          </button>
        </div>

        {/* Lesson Form */}
        {showLessonForm && (
          <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4 animate-fade-in">
            <h3 className="mb-3 font-semibold text-foreground">
              {editingLesson ? "Edit Lesson" : "New Lesson"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Title</label>
                <input value={lessonTitle} onChange={e => setLessonTitle(e.target.value)}
                  placeholder="e.g. Introduction to React Hooks"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Type</label>
                  <select value={lessonType} onChange={e => setLessonType(e.target.value as "video" | "text")}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Duration</label>
                  <input value={lessonDuration} onChange={e => setLessonDuration(e.target.value)}
                    placeholder={lessonType === "video" ? "10:00" : "5 min read"}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Content</label>
                <textarea value={lessonContent} onChange={e => setLessonContent(e.target.value)}
                  rows={3} placeholder="Lesson content..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="flex gap-2">
                <button onClick={editingLesson ? handleUpdateLesson : handleAddLesson}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  {editingLesson ? "Update Lesson" : "Add Lesson"}
                </button>
                <button onClick={resetLessonForm}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lesson List */}
        <div className="space-y-1">
          {course.lessons.map((lesson, i) => (
            <div key={lesson.id}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/50 group">
              <span className="text-muted-foreground">
                <GripVertical className="h-4 w-4" />
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {i + 1}
              </span>
              <span className="text-muted-foreground">
                {lesson.type === "video" ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              </span>
              <span className="flex-1 truncate text-foreground">{lesson.title}</span>
              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEditLesson(lesson)}
                  className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDeleteLesson(lesson.id)}
                  className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {course.lessons.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p>No lessons yet. Click "Add Lesson" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseEditor;
