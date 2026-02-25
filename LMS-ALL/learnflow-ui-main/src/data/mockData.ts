import { User, Course, Enrollment } from "@/types/lms";

export const users: User[] = [
  { id: "inst-1", name: "Dr. Sarah Chen", email: "sarah@lms.com", role: "instructor", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", bio: "Data Science expert with 10+ years of experience" },
  { id: "inst-2", name: "James Rodriguez", email: "james@lms.com", role: "instructor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", bio: "Full-stack developer and educator" },
  { id: "inst-3", name: "Emily Park", email: "emily@lms.com", role: "instructor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", bio: "UX Design lead at a Fortune 500 company" },
  { id: "stu-1", name: "Alex Johnson", email: "alex@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-2", name: "Maria Garcia", email: "maria@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-3", name: "David Kim", email: "david@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-4", name: "Sophie Williams", email: "sophie@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-5", name: "Ryan Patel", email: "ryan@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-6", name: "Lisa Zhang", email: "lisa@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-7", name: "Carlos Mendez", email: "carlos@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-8", name: "Priya Sharma", email: "priya@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-9", name: "Tom Anderson", email: "tom@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-10", name: "Nina Kowalski", email: "nina@student.com", role: "student", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face" },
];

const makeLessons = (courseId: string, titles: string[], types: ("video" | "text")[]) =>
  titles.map((title, i) => ({
    id: `${courseId}-lesson-${i + 1}`,
    title,
    type: types[i % types.length],
    duration: types[i % types.length] === "video" ? `${8 + (i * 3) % 15}:00` : `${5 + i * 2} min read`,
    content: `This is the content for "${title}". In a real application, this would contain the full lesson material with rich text formatting, code examples, and interactive elements.`,
    videoThumbnail: types[i % types.length] === "video" ? `https://images.unsplash.com/photo-${1550000000000 + i * 1000}?w=640&h=360&fit=crop` : undefined,
  }));

export const courses: Course[] = [
  {
    id: "course-1",
    title: "Complete Python for Data Science",
    description: "Master Python programming from basics to advanced data science techniques. Learn NumPy, Pandas, Matplotlib, and Machine Learning fundamentals.",
    instructorId: "inst-1",
    category: "Data Science",
    duration: "24 hours",
    coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
    status: "published",
    price: 49.99,
    rating: 4.8,
    studentsCount: 1247,
    lessons: makeLessons("course-1", [
      "Introduction to Python", "Variables & Data Types", "Control Flow", "Functions & Modules",
      "Working with NumPy", "Pandas DataFrames", "Data Visualization", "Intro to Machine Learning",
      "Linear Regression", "Classification Models", "Project: Data Analysis"
    ], ["video", "text", "video", "video", "video", "text", "video", "video", "text", "video", "video"]),
  },
  {
    id: "course-2",
    title: "Modern React Development",
    description: "Build modern web applications with React, TypeScript, and the latest ecosystem tools. Covers hooks, state management, and best practices.",
    instructorId: "inst-2",
    category: "Web Development",
    duration: "18 hours",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    status: "published",
    price: 39.99,
    rating: 4.7,
    studentsCount: 982,
    lessons: makeLessons("course-2", [
      "React Fundamentals", "JSX Deep Dive", "Component Patterns", "Hooks Mastery",
      "State Management", "Routing & Navigation", "API Integration", "Testing React Apps",
      "Performance Optimization", "Deployment"
    ], ["video", "video", "text", "video", "video", "text", "video", "video", "text", "video"]),
  },
  {
    id: "course-3",
    title: "UX Design Masterclass",
    description: "Learn user experience design from research to prototyping. Master Figma, user testing, and design thinking methodologies.",
    instructorId: "inst-3",
    category: "Design",
    duration: "20 hours",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    status: "published",
    price: 44.99,
    rating: 4.9,
    studentsCount: 756,
    lessons: makeLessons("course-3", [
      "Design Thinking", "User Research Methods", "Personas & User Stories", "Information Architecture",
      "Wireframing Basics", "Figma Essentials", "Prototyping", "Usability Testing",
      "Design Systems", "Portfolio Building"
    ], ["video", "text", "video", "video", "video", "video", "text", "video", "text", "video"]),
  },
  {
    id: "course-4",
    title: "Cloud Computing with AWS",
    description: "Comprehensive guide to Amazon Web Services. Learn EC2, S3, Lambda, and architect scalable cloud solutions.",
    instructorId: "inst-1",
    category: "Cloud Computing",
    duration: "30 hours",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    status: "published",
    price: 59.99,
    rating: 4.6,
    studentsCount: 623,
    lessons: makeLessons("course-4", [
      "Cloud Fundamentals", "AWS Overview", "EC2 Instances", "S3 Storage",
      "IAM & Security", "Lambda Functions", "API Gateway", "DynamoDB",
      "CloudFormation", "Monitoring & Logging", "Cost Optimization", "Capstone Project"
    ], ["video", "text", "video", "video", "text", "video", "video", "video", "text", "video", "text", "video"]),
  },
  {
    id: "course-5",
    title: "Digital Marketing Strategy",
    description: "Master digital marketing channels including SEO, social media, email marketing, and paid advertising campaigns.",
    instructorId: "inst-2",
    category: "Marketing",
    duration: "15 hours",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    status: "published",
    price: 34.99,
    rating: 4.5,
    studentsCount: 1534,
    lessons: makeLessons("course-5", [
      "Marketing Fundamentals", "SEO Basics", "Content Strategy", "Social Media Marketing",
      "Email Campaigns", "Google Ads", "Analytics & Tracking", "Conversion Optimization"
    ], ["video", "text", "video", "video", "text", "video", "video", "text"]),
  },
  {
    id: "course-6",
    title: "iOS App Development with Swift",
    description: "Build beautiful iOS applications using Swift and SwiftUI. From basics to App Store deployment.",
    instructorId: "inst-3",
    category: "Mobile Development",
    duration: "22 hours",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    status: "draft",
    price: 54.99,
    rating: 4.7,
    studentsCount: 0,
    lessons: makeLessons("course-6", [
      "Swift Basics", "SwiftUI Introduction", "Views & Modifiers", "State & Binding",
      "Navigation", "Networking", "Core Data", "Animations", "App Store Submission"
    ], ["video", "video", "text", "video", "video", "video", "text", "video", "text"]),
  },
  {
    id: "course-7",
    title: "Machine Learning Fundamentals",
    description: "Dive into machine learning algorithms, neural networks, and deep learning with hands-on Python projects.",
    instructorId: "inst-1",
    category: "Data Science",
    duration: "28 hours",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    status: "published",
    price: 64.99,
    rating: 4.8,
    studentsCount: 891,
    lessons: makeLessons("course-7", [
      "ML Overview", "Math Foundations", "Supervised Learning", "Decision Trees",
      "Neural Networks", "Deep Learning Intro", "CNNs", "RNNs",
      "Transfer Learning", "Model Deployment"
    ], ["video", "text", "video", "video", "video", "text", "video", "video", "text", "video"]),
  },
];

export const enrollments: Enrollment[] = [
  { studentId: "stu-1", courseId: "course-1", completedLessonIds: ["course-1-lesson-1", "course-1-lesson-2", "course-1-lesson-3", "course-1-lesson-4", "course-1-lesson-5"], enrolledAt: "2024-09-15" },
  { studentId: "stu-1", courseId: "course-2", completedLessonIds: ["course-2-lesson-1", "course-2-lesson-2", "course-2-lesson-3", "course-2-lesson-4", "course-2-lesson-5", "course-2-lesson-6", "course-2-lesson-7", "course-2-lesson-8", "course-2-lesson-9", "course-2-lesson-10"], enrolledAt: "2024-08-01" },
  { studentId: "stu-1", courseId: "course-3", completedLessonIds: ["course-3-lesson-1", "course-3-lesson-2"], enrolledAt: "2025-01-10" },
  { studentId: "stu-2", courseId: "course-1", completedLessonIds: ["course-1-lesson-1", "course-1-lesson-2", "course-1-lesson-3"], enrolledAt: "2024-10-01" },
  { studentId: "stu-2", courseId: "course-4", completedLessonIds: ["course-4-lesson-1", "course-4-lesson-2", "course-4-lesson-3", "course-4-lesson-4", "course-4-lesson-5", "course-4-lesson-6"], enrolledAt: "2024-11-15" },
  { studentId: "stu-3", courseId: "course-2", completedLessonIds: ["course-2-lesson-1", "course-2-lesson-2", "course-2-lesson-3", "course-2-lesson-4"], enrolledAt: "2024-12-01" },
  { studentId: "stu-3", courseId: "course-5", completedLessonIds: ["course-5-lesson-1", "course-5-lesson-2", "course-5-lesson-3", "course-5-lesson-4", "course-5-lesson-5", "course-5-lesson-6", "course-5-lesson-7", "course-5-lesson-8"], enrolledAt: "2024-07-20" },
  { studentId: "stu-4", courseId: "course-1", completedLessonIds: ["course-1-lesson-1"], enrolledAt: "2025-01-05" },
  { studentId: "stu-4", courseId: "course-3", completedLessonIds: ["course-3-lesson-1", "course-3-lesson-2", "course-3-lesson-3", "course-3-lesson-4", "course-3-lesson-5", "course-3-lesson-6", "course-3-lesson-7", "course-3-lesson-8", "course-3-lesson-9", "course-3-lesson-10"], enrolledAt: "2024-06-01" },
  { studentId: "stu-5", courseId: "course-2", completedLessonIds: ["course-2-lesson-1", "course-2-lesson-2"], enrolledAt: "2025-02-01" },
  { studentId: "stu-5", courseId: "course-7", completedLessonIds: ["course-7-lesson-1", "course-7-lesson-2", "course-7-lesson-3", "course-7-lesson-4"], enrolledAt: "2024-11-01" },
  { studentId: "stu-6", courseId: "course-4", completedLessonIds: ["course-4-lesson-1", "course-4-lesson-2"], enrolledAt: "2025-01-20" },
  { studentId: "stu-6", courseId: "course-5", completedLessonIds: ["course-5-lesson-1", "course-5-lesson-2", "course-5-lesson-3"], enrolledAt: "2024-12-10" },
  { studentId: "stu-7", courseId: "course-1", completedLessonIds: ["course-1-lesson-1", "course-1-lesson-2", "course-1-lesson-3", "course-1-lesson-4", "course-1-lesson-5", "course-1-lesson-6", "course-1-lesson-7"], enrolledAt: "2024-08-20" },
  { studentId: "stu-7", courseId: "course-3", completedLessonIds: ["course-3-lesson-1", "course-3-lesson-2", "course-3-lesson-3"], enrolledAt: "2025-01-15" },
  { studentId: "stu-8", courseId: "course-2", completedLessonIds: ["course-2-lesson-1", "course-2-lesson-2", "course-2-lesson-3", "course-2-lesson-4", "course-2-lesson-5", "course-2-lesson-6"], enrolledAt: "2024-09-10" },
  { studentId: "stu-8", courseId: "course-7", completedLessonIds: ["course-7-lesson-1", "course-7-lesson-2"], enrolledAt: "2025-02-05" },
  { studentId: "stu-9", courseId: "course-4", completedLessonIds: ["course-4-lesson-1", "course-4-lesson-2", "course-4-lesson-3", "course-4-lesson-4"], enrolledAt: "2024-10-15" },
  { studentId: "stu-9", courseId: "course-5", completedLessonIds: ["course-5-lesson-1"], enrolledAt: "2025-01-25" },
  { studentId: "stu-10", courseId: "course-1", completedLessonIds: ["course-1-lesson-1", "course-1-lesson-2"], enrolledAt: "2025-02-10" },
  { studentId: "stu-10", courseId: "course-3", completedLessonIds: ["course-3-lesson-1", "course-3-lesson-2", "course-3-lesson-3", "course-3-lesson-4", "course-3-lesson-5"], enrolledAt: "2024-11-20" },
];

// Helper functions
export const getInstructors = () => users.filter(u => u.role === "instructor");
export const getStudents = () => users.filter(u => u.role === "student");
export const getInstructor = (id: string) => users.find(u => u.id === id);
export const getCourse = (id: string) => courses.find(c => c.id === id);
export const getInstructorCourses = (instructorId: string) => courses.filter(c => c.instructorId === instructorId);
export const getPublishedCourses = () => courses.filter(c => c.status === "published");
export const getStudentEnrollments = (studentId: string) => enrollments.filter(e => e.studentId === studentId);
export const getCourseEnrollments = (courseId: string) => enrollments.filter(e => e.courseId === courseId);
export const getProgress = (enrollment: Enrollment, course: Course) =>
  course.lessons.length > 0 ? Math.round((enrollment.completedLessonIds.length / course.lessons.length) * 100) : 0;
