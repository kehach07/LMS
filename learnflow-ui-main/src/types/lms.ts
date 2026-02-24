export interface User {
  id: string;
  name: string;
  email: string;
  role: "instructor" | "student";
  avatar: string;
  bio?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "text";
  duration: string;
  content: string;
  videoThumbnail?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  category: string;
  duration: string;
  coverImage: string;
  lessons: Lesson[];
  status: "published" | "draft";
  price: number;
  rating: number;
  studentsCount: number;
}

export interface Enrollment {
  studentId: string;
  courseId: string;
  completedLessonIds: string[];
  enrolledAt: string;
}

export type UserRole = "instructor" | "student";
