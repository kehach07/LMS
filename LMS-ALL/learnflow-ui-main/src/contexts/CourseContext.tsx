import React, { createContext, useContext, useState, useCallback } from "react";
import { Course, Lesson } from "@/types/lms";
import { courses as initialCourses } from "@/data/mockData";

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addLesson: (courseId: string, lesson: Lesson) => void;
  updateLesson: (courseId: string, lessonId: string, updates: Partial<Lesson>) => void;
  deleteLesson: (courseId: string, lessonId: string) => void;
  getCourse: (id: string) => Course | undefined;
  getInstructorCourses: (instructorId: string) => Course[];
  getPublishedCourses: () => Course[];
}

const CourseContext = createContext<CourseContextType>({
  courses: [],
  addCourse: () => {},
  updateCourse: () => {},
  deleteCourse: () => {},
  addLesson: () => {},
  updateLesson: () => {},
  deleteLesson: () => {},
  getCourse: () => undefined,
  getInstructorCourses: () => [],
  getPublishedCourses: () => [],
});

export const useCourses = () => useContext(CourseContext);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const addCourse = useCallback((course: Course) => {
    setCourses(prev => [...prev, course]);
  }, []);

  const updateCourse = useCallback((id: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  }, []);

  const addLesson = useCallback((courseId: string, lesson: Lesson) => {
    setCourses(prev => prev.map(c =>
      c.id === courseId ? { ...c, lessons: [...c.lessons, lesson] } : c
    ));
  }, []);

  const updateLesson = useCallback((courseId: string, lessonId: string, updates: Partial<Lesson>) => {
    setCourses(prev => prev.map(c =>
      c.id === courseId
        ? { ...c, lessons: c.lessons.map(l => l.id === lessonId ? { ...l, ...updates } : l) }
        : c
    ));
  }, []);

  const deleteLesson = useCallback((courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(c =>
      c.id === courseId ? { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) } : c
    ));
  }, []);

  const getCourse = useCallback((id: string) => courses.find(c => c.id === id), [courses]);

  const getInstructorCourses = useCallback((instructorId: string) =>
    courses.filter(c => c.instructorId === instructorId), [courses]);

  const getPublishedCourses = useCallback(() =>
    courses.filter(c => c.status === "published"), [courses]);

  return (
    <CourseContext.Provider value={{
      courses, addCourse, updateCourse, deleteCourse,
      addLesson, updateLesson, deleteLesson,
      getCourse, getInstructorCourses, getPublishedCourses,
    }}>
      {children}
    </CourseContext.Provider>
  );
};
