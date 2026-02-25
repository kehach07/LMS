import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseLessonsApi,
  createLessonApi,
} from "@/services/courseService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Lesson = {
  id: number;
  title: string;
  lesson_type: "text" | "video";
  content?: string;
  video_url?: string;
  order: number;
};

const InstructorCourseDetail = () => {
  const { courseId } = useParams();
  const id = Number(courseId);

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [title, setTitle] = useState("");
  const [lessonType, setLessonType] = useState<"text" | "video">("text");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const data = await getCourseLessonsApi(id);
      setLessons(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createLessonApi({
        course: id,
        title,
        lesson_type: lessonType,
        content,
        video_url: videoUrl,
        order: lessons.length + 1,
      });

      setTitle("");
      setContent("");
      setVideoUrl("");
      fetchLessons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Lessons</h1>

      {/* Create Lesson */}
      <form
        onSubmit={handleCreateLesson}
        className="border rounded-xl p-4 mb-8 space-y-4"
      >
        <Input
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          className="w-full border rounded-md p-2"
          value={lessonType}
          onChange={(e) =>
            setLessonType(e.target.value as "text" | "video")
          }
        >
          <option value="text">Text Lesson</option>
          <option value="video">Video Lesson</option>
        </select>

        {lessonType === "text" ? (
          <textarea
            className="w-full border rounded-md p-2"
            placeholder="Lesson Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        ) : (
          <Input
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        )}

        <Button type="submit">Add Lesson</Button>
      </form>

      {/* Lesson List */}
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="border rounded-lg p-4 bg-card shadow-sm"
          >
            <h3 className="font-medium">
              {lesson.order}. {lesson.title}
            </h3>

            {lesson.lesson_type === "text" ? (
              <p className="text-sm text-muted-foreground">
                {lesson.content}
              </p>
            ) : (
              <a
                href={lesson.video_url}
                target="_blank"
                className="text-blue-500 text-sm"
              >
                Watch Video
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourseDetail;